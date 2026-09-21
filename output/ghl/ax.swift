import AppKit
import ApplicationServices
import Foundation
func attribute(_ e: AXUIElement, _ key: String) -> CFTypeRef? { var v: CFTypeRef?; return AXUIElementCopyAttributeValue(e,key as CFString,&v) == .success ? v : nil }
func string(_ e: AXUIElement, _ key: String) -> String { return attribute(e,key) as? String ?? "" }
guard let app=NSRunningApplication.runningApplications(withBundleIdentifier:"com.brave.Browser").first else { fatalError("Brave not running") }
let appElement=AXUIElementCreateApplication(app.processIdentifier)
AXUIElementSetMessagingTimeout(appElement, 2)
AXUIElementSetAttributeValue(appElement, "AXManualAccessibility" as CFString, kCFBooleanTrue)
let windows=attribute(appElement,kAXWindowsAttribute) as? [AXUIElement] ?? []
guard let window=windows.first(where:{string($0,kAXDocumentAttribute).contains("app.gohighlevel.com") || string($0,kAXTitleAttribute).lowercased().contains("karchx")}) else { fatalError("HighLevel window is not accessible; stopped") }
let args=Array(CommandLine.arguments.dropFirst())
var nodes:[(String,AXUIElement)]=[]
func walk(_ e:AXUIElement,_ path:String,_ depth:Int) { if depth>45 || nodes.count>6500{return};nodes.append((path,e));let children=attribute(e,kAXChildrenAttribute) as? [AXUIElement] ?? [];for(i,c) in children.enumerated(){walk(c,path+"."+String(i),depth+1)} }
if args.first == "dump" {
 walk(window,"w",0)
 let rows=nodes.compactMap{path,e -> [String:Any]? in
  let role=string(e,kAXRoleAttribute), title=string(e,kAXTitleAttribute), desc=string(e,kAXDescriptionAttribute), value=string(e,kAXValueAttribute)
  let allowed=["AXTextField","AXTextArea","AXComboBox","AXPopUpButton","AXButton","AXCheckBox","AXRadioButton","AXStaticText","AXLink","AXHeading","AXWebArea","AXMenuItem","AXTab","AXMenuButton","AXGroup"]
  if !allowed.contains(role) && title.isEmpty && desc.isEmpty && value.isEmpty{return nil}
  if string(e,kAXSubroleAttribute)=="AXSecureTextField"{return nil}
  var row:[String:Any] = ["path":path,"role":role,"title":title,"description":desc,"value":value]
  if let checked=attribute(e,kAXValueAttribute) as? NSNumber {row["checked"]=checked.intValue}
  if let enabled=attribute(e,kAXEnabledAttribute) as? Bool {row["enabled"]=enabled}
  return row
 }
 let data=try! JSONSerialization.data(withJSONObject:rows,options:[.prettyPrinted,.sortedKeys]);print(String(data:data,encoding:.utf8)!)
} else if args.count>=3 {
 var node=window
 for part in args[1].split(separator:".").dropFirst(){let kids=attribute(node,kAXChildrenAttribute) as? [AXUIElement] ?? [];guard let i=Int(part),kids.indices.contains(i)else{fatalError("Stale AX path")};node=kids[i]}
 guard string(node,kAXRoleAttribute)==args[2]else{fatalError("AX role changed")}
 if args[0]=="drag",args.count>=5 {
  var target=window
  for part in args[3].split(separator:".").dropFirst(){let kids=attribute(target,kAXChildrenAttribute) as? [AXUIElement] ?? [];guard let i=Int(part),kids.indices.contains(i)else{fatalError("Stale drag target")};target=kids[i]}
  guard string(target,kAXRoleAttribute)==args[4]else{fatalError("Drag target role changed")}
  func bounds(_ n:AXUIElement)->(CGPoint,CGSize){var p=CGPoint.zero;var s=CGSize.zero;AXValueGetValue(attribute(n,kAXPositionAttribute) as! AXValue,.cgPoint,&p);AXValueGetValue(attribute(n,kAXSizeAttribute) as! AXValue,.cgSize,&s);return(p,s)}
  app.activate();AXUIElementPerformAction(window,kAXRaiseAction as CFString);Thread.sleep(forTimeInterval:0.2)
  guard NSWorkspace.shared.frontmostApplication?.processIdentifier == app.processIdentifier else{fatalError("Brave not active")}
  let (p,s)=bounds(node);let (q,t)=bounds(target)
  let start=CGPoint(x:p.x+s.width/2,y:p.y+s.height/2);let end=CGPoint(x:q.x+t.width/2,y:q.y+4)
  CGEvent(mouseEventSource:nil,mouseType:.mouseMoved,mouseCursorPosition:start,mouseButton:.left)?.post(tap:.cghidEventTap)
  CGEvent(mouseEventSource:nil,mouseType:.leftMouseDown,mouseCursorPosition:start,mouseButton:.left)?.post(tap:.cghidEventTap)
  Thread.sleep(forTimeInterval:0.15)
  for i in 1...20{let a=CGFloat(i)/20;CGEvent(mouseEventSource:nil,mouseType:.leftMouseDragged,mouseCursorPosition:CGPoint(x:start.x+(end.x-start.x)*a,y:start.y+(end.y-start.y)*a),mouseButton:.left)?.post(tap:.cghidEventTap);Thread.sleep(forTimeInterval:0.03)}
  CGEvent(mouseEventSource:nil,mouseType:.leftMouseUp,mouseCursorPosition:end,mouseButton:.left)?.post(tap:.cghidEventTap)
  print("Dragged visible form element",start,end)
 } else if args[0]=="type",args.count>3 {
  app.activate(); AXUIElementPerformAction(window,kAXRaiseAction as CFString)
  Thread.sleep(forTimeInterval:0.2)
  guard NSWorkspace.shared.frontmostApplication?.processIdentifier == app.processIdentifier else {fatalError("Brave not frontmost; no typing")}
  AXUIElementSetAttributeValue(node,kAXFocusedAttribute as CFString,kCFBooleanTrue)
  let down=CGEvent(keyboardEventSource:nil,virtualKey:0,keyDown:true)!;down.flags = .maskCommand;down.post(tap:.cghidEventTap)
  let up=CGEvent(keyboardEventSource:nil,virtualKey:0,keyDown:false)!;up.flags = .maskCommand;up.post(tap:.cghidEventTap)
  Thread.sleep(forTimeInterval:0.08)
  let chars=Array(args[3].utf16)
  for offset in stride(from:0,to:chars.count,by:20) {
   let chunk=Array(chars[offset..<min(offset+20,chars.count)])
   let textEvent=CGEvent(keyboardEventSource:nil,virtualKey:0,keyDown:true)!
   textEvent.flags = []
   chunk.withUnsafeBufferPointer{buf in textEvent.keyboardSetUnicodeString(stringLength:chunk.count,unicodeString:buf.baseAddress!)}
   textEvent.post(tap:.cghidEventTap)
   CGEvent(keyboardEventSource:nil,virtualKey:0,keyDown:false)?.post(tap:.cghidEventTap)
   Thread.sleep(forTimeInterval:0.03)
  }
  Thread.sleep(forTimeInterval:0.15)
  print("Typed into focused UI field")
 } else if args[0]=="click" {
  guard let p=attribute(node,kAXPositionAttribute), let s=attribute(node,kAXSizeAttribute) else {fatalError("No visible bounds")}
  var point=CGPoint.zero; var size=CGSize.zero
  AXValueGetValue(p as! AXValue,.cgPoint,&point);AXValueGetValue(s as! AXValue,.cgSize,&size)
  app.activate(options: [.activateIgnoringOtherApps]); AXUIElementPerformAction(window,kAXRaiseAction as CFString)
  let center=CGPoint(x:point.x+(args.count>3 && args[3]=="left" ? 6 : size.width/2),y:point.y+size.height/2)
  CGEvent(mouseEventSource:nil,mouseType:.mouseMoved,mouseCursorPosition:center,mouseButton:.left)?.post(tap:.cghidEventTap)
  Thread.sleep(forTimeInterval:0.2)
  CGEvent(mouseEventSource:nil,mouseType:.leftMouseDown,mouseCursorPosition:center,mouseButton:.left)?.post(tap:.cghidEventTap)
  CGEvent(mouseEventSource:nil,mouseType:.leftMouseUp,mouseCursorPosition:center,mouseButton:.left)?.post(tap:.cghidEventTap)
  print("Clicked visible element",center.x,center.y,"size",size.width,size.height)
 } else if args[0]=="focus" {print("Focused:",AXUIElementSetAttributeValue(node,kAXFocusedAttribute as CFString,kCFBooleanTrue).rawValue)} else if args[0]=="press" {print("AXPress:",AXUIElementPerformAction(node,kAXPressAction as CFString).rawValue)}
 else if args[0]=="set",args.count>3 {print("AXSet:",AXUIElementSetAttributeValue(node,kAXValueAttribute as CFString,args[3] as CFString).rawValue)}
} else {print("Usage: ax dump | ax press PATH ROLE | ax set PATH ROLE VALUE")}
