import * as _ from 'lodash';

const Config = {
  twitter: {
    tweet_text: "Simulation électorale. Et si l’on changeait les règles de désignation des députés ?",
    hashtags: ['AssembléeNationale', 'dataviz']
  },
  linkedIn: {
    title: 'Dérangeons la chambre !',
    summary: 'A quoi ressemblerait l’Assemblée Nationale si l’on changeait le mode de scrutin aux élections législatives ? Par Skoli et R. Magni-Berton (Sciences Po Grenoble).',
    source: 'Dérangeons la Chambre',
  },
  helmet: {
    meta: [
      { name:"description", content:"Simulation électorale - A quoi ressemblerait l’Assemblée Nationale si l’on changeait le mode de scrutin aux élections législatives ? Par Skoli et R. Magni-Berton (Sciences Po Grenoble)." },
      { property:"fb:app_id", content:"226290154474919" },
      { property:"og:type", content:"website" },
      { property:"og:url",  content:"http://www.derangeonslachambre.fr" },
      { property:"og:title", content:"Dérangeons la chambre !" },
      { property:"og:description", content:"Simulation électorale - A quoi ressemblerait l’Assemblée Nationale si l’on changeait le mode de scrutin aux élections législatives ? Par Skoli et R. Magni-Berton (Sciences Po Grenoble)." },
      { name:"twitter:card", content:"summary_large_image"},
      { name:"twitter:title", content:"Dérangeons la chambre !"},
      { name:"twitter:description", content:"A quoi ressemblerait l’Assemblée Nationale si l’on changeait le mode de scrutin aux élections législatives ? Par Skoli et R. Magni-Berton (Sciences Po Grenoble)."},
      { name:"twitter:image", content:"http://derangeonslachambre/cover-socials.png"},
    ]
  }
};


const extendMeta = (metas)=>{
  let _metas = _.cloneDeep(Config.helmet.meta);
  for(let i in metas){
    const meta = metas[i];
    const content = meta['content'];
    let key_name = 'property';
    if(meta['name']){
      key_name = 'name';
    }
    const key = meta[key_name];
    let _meta = _metas.find(meta=>meta[key_name] == key)
    if(key == 'og:image' || !_meta){
      _metas.push(meta);
    } else {
      _meta['content'] = content;
    }
  }
  return _metas;
};

export { extendMeta, Config };

export default Config;
