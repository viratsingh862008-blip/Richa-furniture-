function clean(v:any){return String(v??"").trim()}
function webhookUrl(){return clean(process.env.ANALYTICS_WEBHOOK_URL||process.env.ANALYTICS_WEBHOOK)}
export default async function handler(req:any,res:any){
  if(req.method!=="POST")return res.status(405).json({ok:false,message:"Method not allowed."})
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{}
    const url=webhookUrl()
    if(!url)return res.status(503).json({ok:false,message:"Analytics webhook is not configured. Add ANALYTICS_WEBHOOK_URL."})
    const upstream=await fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...body,receivedAt:new Date().toISOString()})})
    if(!upstream.ok)return res.status(502).json({ok:false,message:"Analytics webhook rejected the event."})
    return res.status(200).json({ok:true})
  }catch{return res.status(502).json({ok:false,message:"Could not reach the analytics webhook."})}
}