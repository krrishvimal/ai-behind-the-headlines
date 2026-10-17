export function selectGlobal(records,{country='',year='',harm=''}={}){
  return records.filter(r=>(!country||(country==='unknown'?!r.country:r.country===country))&&(!year||r.date.startsWith(String(year)))&&(!harm||r.harm===harm));
}
export function globalCoverage(records){
  const countries={};let unmapped=0;
  for(const r of records)if(r.country)countries[r.country]=(countries[r.country]??0)+1;else unmapped++;
  return {total:records.length,mapped:records.length-unmapped,unmapped,countries};
}
