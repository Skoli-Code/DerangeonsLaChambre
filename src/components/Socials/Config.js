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
      { property:"fb:app_id", content:"226290154474919" },
      { property:"fb:app_id", content:"226290154474919" },
      { property:"og:type", content:"website" },
      { property:"og:url", content:"http://derangeonslachambre.fr" },
      { property:"og:title", content:"Dérangeons la chambre !" },
      { property:"og:description", content:"Analyse de données textuelles et datavisualisations sur le traitement de l'islam dans la presse française (1997-2015), à partir des archives numériques de trois grands quotidiens. Par Skoli et M.Bourekba." },
      { property:"og:image", content:"http://derangeonslachambre/socials/stacked.png" },
      { property:"og:image", content:"http://derangeonslachambre/socials/cover.png" },
      { property:"og:image", content:"http://derangeonslachambre/socials/wordcloud.png"},
      { name:"twitter:card", content:"summary_large_image"},
      { name:"twitter:title", content:"Dérangeons la chambre !"},
      { name:"twitter:description", content:"Analyse de données textuelles et datavisualisations sur le traitement de l'islam dans la presse française (1997-2015). Par Skoli et M.Bourekba."},
      { name:"twitter:image", content:"http://derangeonslachambre/socials/wordcloud.png"},
    ]
  }
};


const extendConfig = (config)=>{
  let _config = _.cloneDeep(Config);
  for(let i in config.meta){
    const meta = config.meta[i];
    const content = meta['content'];
    let key_name = 'property';
    if(meta['name']){
      key_name = 'name';
    }
    const key = meta[key_name];
    _config.meta.find(meta=>meta[key_name] == key)['content'] = content;
  }
  return _config;
};

export { extendConfig, Config };

export default Config;
