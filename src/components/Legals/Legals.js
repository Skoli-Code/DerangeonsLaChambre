import React from 'react';
import Markdown from 'react-markdown';

const content = `
### Mentions légales
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skoli

  **Siret** : 40263675700039

  **Adresses**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Siège : 11 rue Duphot 69003 Lyon

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bureau : 9 rue de la Martinière 69001 Lyon

### Contact

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Mail** : contact@skoli.fr

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Site web** : skoli.fr

  Responsables de la publication
  Lucas Piessat, Pierre Bellon, Gauthier Bravais

**Développement**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skoli (Pierre Bellon)

**Hébergement**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hébergeur : Github San Francisco - California (USA)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site Web : www.github.com

**Conditions d’utilisation**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pour une expérience de qualité, nous vous recommandons de recourir à des navigateurs modernes comme Firefox, Opera, Brave, Safari, Google Chrome. Skoli met en œuvre tous les moyens dont elle dispose, pour assurer une information fiable et une mise à jour fiable de ses sites internet. Toutefois, des erreurs ou omissions peuvent survenir. L'internaute devra donc s'assurer de l'exactitude des informations auprès de Skoli, et signaler toutes modifications du site qu'il jugerait utile. Skoli n'est en aucun cas responsable de l'utilisation faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.

**Cookies**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nous n’en utilisons pas.

**Liens hypertextes**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Les sites internet peuvent offrir des liens vers d’autres sites internet ou d’autres ressources disponibles sur Internet. Skoli ne dispose d'aucun moyen pour contrôler les sites en connexion avec ses sites internet.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skoli ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes, et notamment des informations, produits ou services qu’ils proposent, ou de tout usage qui peut être fait de ces éléments. Les risques liés à cette utilisation incombent pleinement à l'internaute, qui doit se conformer à leurs conditions d'utilisation.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skoli n’est pas responsable des hyperliens externes redirigeant vers www.derangeonslachambre.fr et n’a pas de politique d’approbation de ces liens.

**Services fournis**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skoli s’efforce de fournir sur le site www.derangeonslachambre.fr des informations aussi précises que possible. Les renseignements figurant sur le site www.derangeonslachambre.fr ne sont pas exhaustifs et les photos non contractuelles. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne. Par ailleurs, tous les informations indiquées sur le site www.derangeonslachambre.fr sont données à titre indicatif, et sont susceptibles de changer ou d’évoluer sans préavis.

**Limitation contractuelles sur les données**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l’année, mais peut toutefois contenir des inexactitudes ou des omissions. Si vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email, à l’adresse contact@skoli.fr, en décrivant le problème de la manière la plus précise possible (page posant problème, type d’ordinateur et de navigateur utilisé, etc.). Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité. En conséquence, Skoli ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour. Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de Skoli.

**Propriété intellectuelle**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sauf mention contraire, l’ensemble du site et des réalisations qu’il présente sont sous licence “Creative Commons Attribution Pas d'Utilisation Commerciale Partage à l'Identique 4.0 International” (CC-BY-NC-SA-4.0). Le code source est diffusé avec la licence Gnu GPL 3.0.

**Déclaration à la CNIL**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Conformément à la loi 78-17 du 6 janvier 1978 (modifiée par la loi 2004-801 du 6 août 2004 relative à la protection des personnes physiques à l'égard des traitements de données à caractère personnel) relative à l'informatique, aux fichiers et aux libertés, ce site n'a pas fait l'objet d'une déclaration auprès de la Commission nationale de l'informatique et des libertés www.cnil.fr puisqu’il n’est pas concerné par ce type de dipsositions.

**Litiges**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Les présentes conditions du site www.derangeonslachambre.fr sont régies par les lois françaises et toute contestation ou litiges qui pourraient naître de l'interprétation ou de l'exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de la société. La langue de référence, pour le règlement de contentieux éventuels, est le français.

**Données personnelles**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;De manière générale, vous n’êtes pas tenu de nous communiquer vos données personnelles lorsque vous visitez notre site Internet www.derangeonslachambre.fr. Les éventuelles informations transmises à Skoli ne seront partagées avec aucun autre acteur sans votre autorisation. Enfin, nous pouvons collecter de manière automatique certaines informations vous concernant lors d’une simple navigation sur notre site Internet, notamment: des informations concernant l’utilisation de notre site, comme les zones que vous visitez et les services auxquels vous accédez, votre adresse IP, le type de votre navigateur, vos temps d'accès. De telles informations sont utilisées exclusivement à des fins de statistiques internes, de manière à améliorer la qualité des services qui vous sont proposés. Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.
`;

export default class Legals extends React.Component {
  render(){
    return (
      <Markdown source={content}/>
    );
  }
}
