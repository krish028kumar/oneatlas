// All data below is MOCK sample data, not real pricing or scores.
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  await db.score.deleteMany(); await db.modelProvider.deleteMany();
  await db.model.deleteMany(); await db.benchmark.deleteMany();
  await db.provider.deleteMany(); await db.lab.deleteMany();
  const labs = await Promise.all([["alpha-ai","Alpha AI","US"],["nova-labs","Nova Labs","UK"],["kite-research","Kite Research","IN"]]
    .map(([slug,name,country]) => db.lab.create({ data:{slug,name,country,description:`${name} builds frontier AI models.`} })));
  const provs = await Promise.all(["Direct API","CloudHost","FastInfer"].map(n =>
    db.provider.create({ data:{slug:n.toLowerCase().replace(" ","-"),name:n,website:`https://${n.replace(" ","").toLowerCase()}.example.com`} })));
  const bms = await Promise.all([["MMLU","reasoning"],["HumanEval","coding"],["MMMU","vision"]]
    .map(([name,category]) => db.benchmark.create({ data:{name,category} })));
  const types = ["chat","chat","multimodal","embedding","image","chat","multimodal","chat"];
  for (let i = 0; i < 8; i++) {
    const lab = labs[i % 3], t = types[i];
    const m = await db.model.create({ data:{
      slug:`model-${i+1}`, name:`${lab.name.split(" ")[0]} ${["Pro","Mini","Vision","Embed","Draw","Ultra","Omni","Lite"][i]}`,
      description:"Sample model for demo purposes.", type:t,
      capabilities: t==="chat" ? ["tools","json"] : t==="multimodal" ? ["vision","tools"] : [t],
      contextWindow:[128000,32000,200000,8000,4000,1000000,128000,64000][i],
      inputPrice:[3,0.15,5,0.02,0,10,2.5,0.1][i], outputPrice:[15,0.6,15,0,0.04,30,10,0.4][i],
      releaseDate:new Date(2025, i, 10+i), labId:lab.id } });
    for (const p of provs.slice(0, 1 + (i % 3)))
      await db.modelProvider.create({ data:{modelId:m.id,providerId:p.id,inputPrice:m.inputPrice*(0.9+Math.random()*0.3),outputPrice:m.outputPrice*(0.9+Math.random()*0.3)} });
    for (const b of bms) await db.score.create({ data:{modelId:m.id,benchmarkId:b.id,value:Math.round(55+Math.random()*40)} });
  }
}
main().finally(() => db.$disconnect());
