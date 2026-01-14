import LegalPageTemplate from '../components/LegalPageTemplate';
import SEO from '../components/SEO';

export default function ExpeditionPage() {
  return (
    <LegalPageTemplate title="Expédition">
      <SEO
        title="Livraison"
        description="Livraison gratuite RENAISSANCE Paris. Expédition sous 24-48h, suivi Colissimo et livraison internationale. Découvrez nos délais et conditions."
        url="/livraison"
      />
      <h2>Politique d'Expédition</h2>
      <p>
        Nous nous engageons à expédier vos commandes rapidement et en toute transparence.
      </p>

      <h3>Zone et Mode de Livraison</h3>
      <ul>
        <li>
          <strong>Zone de livraison</strong> : L'expédition est réalisée à l'international, sans zone géographique exclue connue.
        </li>
        <li>
          <strong>Transporteur</strong> : Les colis sont expédiés via Colissimo, en mode livraison standard.
        </li>
      </ul>

      <h3>Délais et Suivi</h3>
      <ul>
        <li>
          <strong>Expédition</strong> : Les commandes sont préparées et expédiées sous 24 à 48 heures ouvrées.
        </li>
        <li>
          <strong>Livraison</strong> : Le délai de livraison est estimé entre 1 et 3 jours ouvrés après expédition, selon la destination.
        </li>
        <li>
          <strong>Suivi</strong> : Un numéro de suivi vous est communiqué et vous pouvez suivre votre colis en ligne via le site de La Poste.
        </li>
      </ul>

      <h2>Frais de Livraison</h2>
      <p>
        <strong>Livraison offerte</strong> : Nous offrons la livraison standard pour toutes les commandes, quelle que soit la destination.
      </p>

      <h2>Zones de Livraison Détaillées</h2>

      <h3>France Métropolitaine</h3>
      <ul>
        <li><strong>Délai</strong> : 1-2 jours ouvrés après expédition</li>
        <li><strong>Transporteur</strong> : Colissimo</li>
        <li><strong>Tarif</strong> : Gratuit</li>
      </ul>

      <h3>Union Européenne</h3>
      <ul>
        <li><strong>Délai</strong> : 2-3 jours ouvrés après expédition</li>
        <li><strong>Transporteur</strong> : Colissimo International</li>
        <li><strong>Tarif</strong> : Gratuit</li>
      </ul>

      <h3>International (hors UE)</h3>
      <ul>
        <li><strong>Délai</strong> : 3-7 jours ouvrés après expédition (selon destination)</li>
        <li><strong>Transporteur</strong> : Colissimo International</li>
        <li><strong>Tarif</strong> : Gratuit</li>
        <li><strong>Note</strong> : Des frais de douane peuvent s'appliquer selon les législations locales. Ces frais sont à la charge du destinataire.</li>
      </ul>

      <h2>Préparation de la Commande</h2>
      <p>
        Chaque paire de lunettes Renaissance est soigneusement emballée dans son écrin d'origine, accompagnée d'un certificat d'authenticité et d'un guide d'entretien. Nos packagings reflètent l'excellence de nos créations et garantissent une protection optimale durant le transport.
      </p>

      <h2>Notification et Suivi</h2>
      <p>
        Vous recevrez une confirmation d'expédition par e-mail dès que votre commande aura quitté nos ateliers. Cet e-mail contiendra :
      </p>
      <ul>
        <li>Votre numéro de suivi</li>
        <li>Un lien direct vers le site du transporteur</li>
        <li>Une estimation de la date de livraison</li>
      </ul>

      <h2>Problèmes de Livraison</h2>
      
      <h3>Colis non reçu</h3>
      <p>
        Si votre colis n'est pas arrivé dans les délais indiqués, veuillez d'abord vérifier le suivi en ligne. Si le problème persiste, contactez-nous à <a href="mailto:contact@renaissanceeyewear.com">contact@renaissanceeyewear.com</a> avec votre numéro de commande.
      </p>

      <h3>Colis endommagé</h3>
      <p>
        Si votre colis arrive endommagé, veuillez :
      </p>
      <ol>
        <li>Prendre des photos du colis et du contenu</li>
        <li>Contacter notre service client immédiatement</li>
        <li>Conserver l'emballage d'origine</li>
      </ol>
      <p>
        Nous organiserons un échange ou un remboursement dans les plus brefs délais.
      </p>

      <h2>Livraison chez nos Opticiens Partenaires</h2>
      <p>
        Pour une expérience encore plus personnalisée, vous pouvez choisir de faire livrer votre commande directement chez l'un de nos 200+ opticiens partenaires en France. Contactez-nous pour plus d'informations sur cette option.
      </p>

      <h2>Contact Service Client</h2>
      <p>
        Pour toute question concernant votre livraison :
      </p>
      <ul>
        <li><strong>Email :</strong> <a href="mailto:contact@renaissanceeyewear.com">contact@renaissanceeyewear.com</a></li>
        <li><strong>Délai de réponse :</strong> Sous 48 heures ouvrées</li>
      </ul>
    </LegalPageTemplate>
  );
}