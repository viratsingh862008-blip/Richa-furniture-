function clean(v:any){return String(v??"").trim()}
function webhookUrl(){return clean(process.env.LEAD_WEBHOOK_URL||process.env.LEAD_WEBHOOK)}
export default async function handler(req:any,res:any){
  if(req.method!=="POST")return res.status(405).json({ok:false,message:"Method not allowed."})
  const b=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{}
  const name=clean(b.name),phone=clean(b.phone),room=clean(b.room),message=clean(b.message)
  if(name.length<2||!/^[+0-9()\-\s]{8,18}$/.test(phone))return res.status(400).json({ok:false,message:"Enter a valid name and phone number."})
  const url=webhookUrl()
  if(!url)return res.status(503).json({ok:false,message:"Lead webhook is not configured. Add LEAD_WEBHOOK or LEAD_WEBHOOK_URL."})
  const payload={id:crypto.randomUUID(),name,phone,room,message,createdAt:new Date().toISOString()}
  try{
    const upstream=await fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)})
    if(!upstream.ok)return res.status(502).json({ok:false,message:"Lead service rejected the room brief."})
    return res.status(200).json({ok:true,id:payload.id})
  }catch{return res.status(502).json({ok:false,message:"Could not reach the lead webhook."})}
}