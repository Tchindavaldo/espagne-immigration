import React from 'react';
import { 
    FileText, GraduationCap, Briefcase, Plane, 
    Clock, Users, Lightbulb, Landmark, 
    MapPin, Sun, TrendingUp, Key, 
    CreditCard, Shield, Flag 
} from 'lucide-react';

export interface InfoCardData {
    title: string;
    items: string[];
}

export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    content: string;
    requirements: string[];
    infoSection?: {
        mainCard: {
            title: string;
            icon: React.ReactNode;
            btnText: string;
        };
        cards: InfoCardData[];
    };
}

export const servicesData: Record<string, ServiceData> = {
    'visa-visiteur': {
        id: 'visa-visiteur',
        title: 'Visa Visiteur',
        subtitle: 'Résidence Temporaire',
        description: 'Le visa visiteur vous permet de séjourner en Espagne pour des raisons personnelles, familiales ou récréatives.',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1400&q=80',
        content: `<h2>Visa Visiteur Espagne</h2>
    <p>Le visa visiteur (ou visa de court séjour) permet de séjourner en Espagne jusqu'à 90 jours dans une période de 180 jours. Il est destiné aux personnes souhaitant rendre visite à de la famille, des amis, ou voyager à titre personnel.</p>
    <h3>Conditions d'éligibilité</h3>`,
        requirements: [
            'Passeport valide 6 mois après la date de retour',
            'Justificatif de logement (invitation ou hôtel)',
            'Preuve de ressources financières suffisantes',
            'Assurance voyage couvrant l\'Espagne',
            'Billet aller-retour ou itinéraire de voyage',
            'Lettre d\'invitation (si hébergé chez un tiers)'
        ],
        infoSection: {
            mainCard: {
                title: "Besoin d'aide pour votre demande de visa visiteur ?",
                icon: <FileText className="w-9 h-9 text-white stroke-[2]" />,
                btnText: "Évaluer mon dossier"
            },
            cards: [
                {
                    title: "Pourquoi choisir España Immigration ?",
                    items: [
                        "Accompagnement **personnalisé** de A à Z",
                        "**Taux de réussite 98%** sur les visas visiteurs",
                        "Préparation **rigoureuse** du dossier complet",
                        "Réponse garantie **sous 24 heures**"
                    ]
                },
                {
                    title: "Documents à fournir",
                    items: [
                        "**Passeport** valide 6 mois après le retour",
                        "**Justificatif** de logement (hôtel ou invitation)",
                        "**Assurance** voyage couvrant l'Espagne",
                        "**Billet** aller-retour ou itinéraire"
                    ]
                },
                {
                    title: "Qui peut postuler ?",
                    items: [
                        "**Durée :** Séjour jusqu'à 90 jours",
                        "**Motif :** Tourisme, famille ou personnel",
                        "**Ressources :** Preuve de moyens financiers",
                        "**Situation :** Régulier dans le pays d'origine"
                    ]
                },
                {
                    title: "Notre processus",
                    items: [
                        "Évaluation **gratuite** de votre dossier",
                        "Constitution du dossier **complet**",
                        "Dépôt auprès du **consulat** espagnol",
                        "Suivi jusqu'à l'**obtention** du visa"
                    ]
                }
            ]
        }
    },
    'permis-etudes': {
        id: 'permis-etudes',
        title: "Permis d'Études",
        subtitle: 'Résidence Temporaire',
        description: 'Étudiez dans les universités espagnoles les plus reconnues. Nous facilitons votre visa étudiant.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80',
        content: `<h2>Permis d'Études en Espagne</h2><p>L'Espagne accueille plus de 200 000 étudiants étrangers chaque année. Ses universités figurent parmi les meilleures d'Europe.</p><h3>Conditions requises</h3>`,
        requirements: [
            'Lettre d\'acceptation d\'un établissement reconnu',
            'Justificatif de financement (études et vie)',
            'Assurance maladie valable en Espagne',
            'Extrait de casier judiciaire (moins de 3 mois)',
            'Certificat médical d\'aptitude',
            'Formulaire EX-00 complété'
        ],
        infoSection: {
            mainCard: {
                title: "Prêt pour vos études en Espagne ?",
                icon: <GraduationCap className="w-9 h-9 text-white stroke-[2]" />,
                btnText: "Évaluer mon dossier"
            },
            cards: [
                {
                    title: "Avantages Étudiants",
                    items: [
                        "Accès aux **meilleures universités**",
                        "Possibilité de **travailler 30h/semaine**",
                        "Facilité de **renouvellement** du titre",
                        "Accompagnement pour le **NIE étudiant**"
                    ]
                },
                {
                    title: "Dossier Académique",
                    items: [
                        "**Lettre d'admission** officielle",
                        "Preuve de **logement** étudiant",
                        "Relevés de **notes** et diplômes",
                        "Justificatif de **paiement** des frais"
                    ]
                },
                {
                    title: "Conditions de Vie",
                    items: [
                        "**Budget :** Env. 1000€/mois recommandés",
                        "**Ville :** Aide au choix de la localisation",
                        "**Vie :** Support intégration culturelle",
                        "**Transport :** Conseils mobilités urbaines"
                    ]
                },
                {
                    title: "Success Stories",
                    items: [
                        "**Plus de 500** étudiants accompagnés",
                        "Partenariat avec **20+ universités**",
                        "Support **Post-Diplôme** (Recherche emploi)",
                        "Accompagnement **famille** si besoin"
                    ]
                }
            ]
        }
    },
    'permis-travail': {
        id: 'permis-travail',
        title: 'Permis de Travail',
        subtitle: 'Résidence Temporaire',
        description: 'Intégrez le marché du travail espagnol grâce à notre expertise en permis de travail.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80',
        content: `<h2>Permis de Travail en Espagne</h2><p>L'Espagne cherche des talents. Nous vous aidons à obtenir votre autorisation de travail.</p>`,
        requirements: [
            'Contrat de travail signé par l\'employeur',
            'Diplômes et qualifications professionnelles',
            'Passeport valide',
            'Casier judiciaire apostillé',
            'Formulaire EX-03'
        ],
        infoSection: {
            mainCard: {
                title: "Une opportunité professionnelle en Espagne ?",
                icon: <Briefcase className="w-9 h-9 text-white stroke-[2]" />,
                btnText: "Évaluer mon dossier"
            },
            cards: [
                {
                    title: "Expertise Travail",
                    items: [
                        "Gestion des **contrats complexes**",
                        "Liaison avec les **entreprises**",
                        "Vérification des **quotas annuels**",
                        "Support pour les **métiers sous tension**"
                    ]
                },
                {
                    title: "Documents Employeur",
                    items: [
                        "Justificatif de **paiement sécurité sociale**",
                        "Mémoire explicatif de la **viabilité**",
                        "Attestation **fiscale** de l'entreprise",
                        "**Contrat de travail** aux normes ES"
                    ]
                },
                {
                    title: "Sécurité & Droits",
                    items: [
                        "Information sur les **salaires minimums**",
                        "Conseils sur le **droit du travail**",
                        "Assistance **sécurité sociale**",
                        "Support **cotisations** et retraite"
                    ]
                },
                {
                    title: "Nos Résultats",
                    items: [
                        "**Placement** réussi pour divers secteurs",
                        "Accompagnement **Hautes Qualifications**",
                        "Renouvellement **facilité** après 1 an",
                        "Support **TIE Travailleur**"
                    ]
                }
            ]
        }
    },
    'visa-touriste': {
        id: 'visa-touriste',
        title: 'Visa Touriste',
        subtitle: 'Court Séjour',
        description: 'Explorez les merveilles de l\'Espagne en toute sérénité avec notre service de visa touristique.',
        image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1400&q=80',
        content: '<h2>Visitez l\'Espagne</h2><p>Découvrez la culture, la gastronomie et les paysages espagnols...</p>',
        requirements: ['Passeport', 'Assurance', 'Preuve de fonds'],
        infoSection: {
            mainCard: { title: "Besoin d'aide pour votre demande de visa touriste ?", icon: <Plane className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Pourquoi choisir España Immigration ?", items: ["Accompagnement **personnalisé**", "**Taux de réussite 98%**", "Préparation **rigoureuse**", "Réponse garantie **sous 24 heures**"] },
                { title: "Documents à fournir", items: ["**Passeport** en cours de validité", "**Assurance** voyage internationale", "**Réservation** de vol et d'hôtel", "**Preuve de fonds** suffisants"] },
                { title: "Qui peut postuler ?", items: ["**Durée :** Séjour touristique", "**Motif :** Vacances, loisirs", "**Ressources :** Autosuffisance financière", "**Situation :** Sans intention de travail"] },
                { title: "Notre processus", items: ["Évaluation **gratuite** du séjour", "Rassemblement des **pièces du dossier**", "Dépôt auprès du **consulat**", "Suivi jusqu'à l'**obtention** du visa"] }
            ]
        }
    },
    'sejour-temporaire': {
        id: 'sejour-temporaire',
        title: 'Séjour Temporaire',
        subtitle: 'Résidence Temporaire',
        description: 'Une solution flexible pour ceux qui souhaitent vivre temporairement en Espagne.',
        image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1400&q=80',
        content: '<h2>Séjour Temporaire</h2><p>Le régime général de résidence temporaire...</p>',
        requirements: ['Justificatif de ressources', 'Casier judiciaire', 'Assurance médicale'],
        infoSection: {
            mainCard: { title: "Un projet de vie temporaire en Espagne ?", icon: <Clock className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Avantages du programme", items: ["Vivre **plus de 90 jours** en Espagne", "Idéal pour une **année sabbatique**", "Accès partiel aux **services publics**", "Possibilité de **voyager en Europe**"] },
                { title: "Documents à fournir", items: ["**Justificatif de ressources** financières", "**Casier judiciaire** vierge", "**Assurance médicale** complète", "**Certificat médical**"] },
                { title: "Conditions Requises", items: ["**Finances :** Revenus passifs démontrables", "**Santé :** Couverture totale sans carence", "**Légalité :** Absence de délits graves", "**Motif :** Volonté de résider sans travailler"] },
                { title: "Notre accompagnement", items: ["Vérification de la **solvabilité**", "Traduction et **légalisation**", "Assistance lors du **rendez-vous**", "Demande de la **carte de séjour TIE**"] }
            ]
        }
    },
    'regroupement-familial': {
        id: 'regroupement-familial',
        title: 'Regroupement Familial',
        subtitle: 'Résidence Permanente',
        description: 'Réunissez votre famille en Espagne avec nos services d\'accompagnement dédiés.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&q=80',
        content: '<h2>Regroupement Familial</h2><p>Le droit de vivre en famille est fondamental...</p>',
        requirements: ['Preuve de parenté', 'Ressources suffisantes', 'Logement adéquat'],
        infoSection: {
            mainCard: { title: "Faire venir votre famille en Espagne ?", icon: <Users className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Parents Concernés", items: ["**Conjoint(e)** ou partenaire pacsé", "**Enfants mineurs** ou à charge", "**Ascendants** à charge", "**Accompagnement spécifique** par cas"] },
                { title: "Documents Requis", items: ["**Actes de naissance/mariage**", "Preuve de **logement adéquat**", "Justificatifs de **ressources du regroupant**", "Copies de **cartes de résidence**"] },
                { title: "Conditions Exigées", items: ["**Statut de résidence :** Résident légal rénové", "**Finances :** Atteindre le seuil IPREM", "**Logement :** Rapport de viabilité positif", "**Liens :** Preuves de dépendance"] },
                { title: "Notre Protocole", items: ["Analyse de la **viabilité financière**", "Demande du **rapport de logement**", "Dépôt des dossiers en **Espagne & Consulat**", "Suivi croisé **jusqu'au visa**"] }
            ]
        }
    },
    'visa-entrepreneur': {
        id: 'visa-entrepreneur',
        title: 'Visa Entrepreneur',
        subtitle: 'Affaires & Entreprise',
        description: 'Lancez votre business en Espagne. On s\'occupe du cadre légal pour vous.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
        content: '<h2>Investir en Espagne</h2><p>L\'Espagne offre un environnement dynamique pour les nouveaux entrepreneurs...</p>',
        requirements: ['Business Plan validé', 'Capitaux propres', 'Innovation ou intérêt économique'],
        infoSection: {
            mainCard: { title: "Prêt à créer votre entreprise en Espagne ?", icon: <Lightbulb className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "L'Opportunité", items: ["Visa valable **sur 2 ans**", "Décision rapide **(10 à 20 jours)**", "Inclus **conjoint et enfants**", "Démarches **simplifiées en Espagne**"] },
                { title: "Documents Clés", items: ["**Business Plan** détaillé", "**Justificatif de capitaux**", "Rapport d'**Intérêt Économique**", "**Profil professionnel**"] },
                { title: "Projet innovant ?", items: ["**Technologie :** Fort potentiel", "**Emploi :** Création de postes locaux", "**Impact :** Développement local", "**Scalabilité :** Modèle exportable"] },
                { title: "Notre Stratégie", items: ["Audit du **Business Plan**", "Obtention de l'**approbation ENISA**", "Montage du **dossier juridique**", "Constitution de la **société**"] }
            ]
        }
    },
    'programme-national': {
        id: 'programme-national',
        title: 'Programme National',
        subtitle: 'Résidence Permanente',
        description: 'Bénéficiez du programme national pour obtenir votre résidence permanente en Espagne.',
        image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1400&q=80',
        content: '<h2>Programme National</h2><p>Le programme national est conçu pour les résidents de longue durée...</p>',
        requirements: ['Séjour ininterrompu de 5 ans', 'Ressources stables', 'Absence de casier judiciaire'],
        infoSection: {
            mainCard: { title: "Envie de devenir résident permanent ?", icon: <Landmark className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Les Avantages", items: ["Résidence valable **5 ans** renouvelable", "Mêmes **droits** que les Espagnols", "Liberté de mouvement en **UE**", "Étape vers la **citoyenneté**"] },
                { title: "Documents à fournir", items: ["**Passeport** complet", "**Preuve de séjour** (empadronamiento)", "Contrats et **fiches de paie**", "**Casier judiciaire** récent"] },
                { title: "Critères d'Éligibilité", items: ["**Durée :** 5 ans de séjour légal", "**Absences :** Moins de 10 mois hors Espagne", "**Dossier :** Aucun incident pénal", "**Cotisations :** Travail validé"] },
                { title: "Nos Actions", items: ["Calcul précis des **jours de présence**", "Collecte des **certificats locaux**", "Vérification des **antécédents**", "Prise de rendez-vous en **préfecture**"] }
            ]
        }
    },
    'programme-regional': {
        id: 'programme-regional',
        title: 'Programme Régional',
        subtitle: 'Résidence Permanente',
        description: 'Découvrez les avantages des programmes régionaux spécifiques à chaque communauté autonome.',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1400&q=80',
        content: '<h2>Programme Régional</h2><p>Certaines régions offrent des facilités supplémentaires pour l\'immigration...</p>',
        requirements: ['Critères spécifiques à la région', 'Logement sur place', 'Intégration locale'],
        infoSection: {
            mainCard: { title: "Intéressé par une opportunité régionale ?", icon: <MapPin className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Spécificités Régionales", items: ["**Programmes d'attraction** des talents", "**Aides** à l'intégration locale", "Mesures contre le **dépeuplement**", "**Priorités sectorielles**"] },
                { title: "Dossier Requis", items: ["**Certificat d'empadronamiento**", "**Rapport d'intégration**", "Contrats locaux", "Preuve de **maîtrise linguistique**"] },
                { title: "Conditions Exigées", items: ["**Localisation :** Résider dans la communauté", "**Engagement :** Volonté de s'y établir", "**Compétences :** Répondre aux besoins", "**Intégration :** Attestations"] },
                { title: "Notre Approche", items: ["Identification des **meilleures régions**", "Assistance **linguistique**", "Demandes de **certificats**", "Contact avec les **autorités locales**"] }
            ]
        }
    },
    'retraites': {
        id: 'retraites',
        title: 'Visa Retraités',
        subtitle: 'Résidence Permanente',
        description: 'Profitez de votre retraite sous le soleil espagnol avec le visa non lucratif.',
        image: 'https://images.unsplash.com/photo-1509983984260-8430a9967ba9?w=1400&q=80',
        content: '<h2>Visa pour Retraités (Non Lucratif)</h2><p>Le visa non lucratif est idéal pour les retraités souhaitant s\'installer en Espagne sans y travailler.</p>',
        requirements: ['Preuve de revenus passifs suffisants', 'Couverture santé complète', 'Casier judiciaire vierge'],
        infoSection: {
            mainCard: { title: "Vivre votre retraite en Espagne ?", icon: <Sun className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Une Qualité de Vie Inégalée", items: ["**Coût de la vie** avantageux", "**Climat** exceptionnel", "Système de santé **moderne**", "Communautés **d'expatriés actives**"] },
                { title: "Pièces Justificatives", items: ["Preuve de **pension ou rentes**", "Attestation d'**assurance santé privée**", "Certificat de **pension gouvernementale**", "**Relevés bancaires** certifiés"] },
                { title: "Profil du Demandeur", items: ["**Âge :** Retraité", "**Ressources :** Minimum 400% de l'IPREM", "**Santé :** Couverture totale sans franchise", "**Conduite :** Aucun antécédent pénal"] },
                { title: "Notre Service Retraite", items: ["Montage **financier** du dossier", "Comparatif **d'assurance**", "Aide à la **recherche immobilière**", "Démarches **(NIE, Padron)**"] }
            ]
        }
    },
    'visa-investissement': {
        id: 'visa-investissement',
        title: 'Visa Investissement',
        subtitle: 'Affaires & Entreprise',
        description: 'Obtenez votre visa en investissant dans l\'économie espagnole.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=80',
        content: '<h2>Visa Investissement</h2><p>Investissez dans l\'immobilier ou dans des entreprises espagnoles pour obtenir votre résidence.</p>',
        requirements: ['Investissement minimum', 'Origine des fonds prouvée', 'Assurance médicale'],
        infoSection: {
            mainCard: { title: "Investir dans l'économie espagnole ?", icon: <TrendingUp className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Avantages", items: ["**Résidence immédiate** pour la famille", "Pas de **séjour continu obligatoire**", "Parcous **rapide et prioritaire**", "Accès à l'**Espace Schengen**"] },
                { title: "Déclaration & Preuves", items: ["Certificats d'**institutions financières**", "Preuve de **Dette publique**", "Ou d'**Actions/Fonds**", "**Déclaration d'origine** des fonds"] },
                { title: "Critères d'Éligibilité", items: ["**Capital :** 1M€ à 2M€", "**Compliance :** Vérification KYC/AML", "**Légalité :** Fonds d'origine licite", "**Santé :** Assurance privée espagnole"] },
                { title: "Notre Rôle", items: ["Liaison avec les **banques**", "Structuration **fiscale**", "Obtention du **certificat d'investissement**", "Procédure d'immigration **VIP**"] }
            ]
        }
    },
    'golden-visa': {
        id: 'golden-visa',
        title: 'Golden Visa',
        subtitle: 'Affaires & Entreprise',
        description: 'Le programme Golden Visa offre la résidence en échange d\'un investissement immobilier majeur.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80',
        content: '<h2>Golden Visa Espagne</h2><p>Obtenez la résidence accélérée pour vous et votre famille grâce à un investissement immobilier de 500 000€ minimum.</p>',
        requirements: ['Achat immobilier de 500k€ minimum', 'Fonds propres', 'Aucune obligation de séjour permanent'],
        infoSection: {
            mainCard: { title: "Intéressé par le Golden Visa immobilier ?", icon: <Key className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Les Atouts Majeurs", items: ["Permis de **travail et résidence**", "Idéal pour les **résidences secondaires**", "Renouvellement **simple (1 visite/an)**", "Marchepied vers la **nationalité**"] },
                { title: "Documents Immobiliers", items: ["**Acte de propriété** notarié", "**Certificat du registre** de la propriété", "Justificatif de **paiement sans prêt**", "Formulaires **fiscaux** associés"] },
                { title: "Conditions Précises", items: ["**Seuil :** 500.000€ net", "**Type :** Résidentiel, commercial", "**Propriétaire :** Nom propre ou holding", "**Achat :** Réalisé après 2013"] },
                { title: "Accompagnement Premium", items: ["Partenariat avec **agences immobilières**", "Due diligence **juridique**", "Représentation par **procuration**", "Procédure d'immigration **Fast-Track**"] }
            ]
        }
    },
    'nie-tie': {
        id: 'nie-tie',
        title: 'NIE / TIE',
        subtitle: 'Autres Services',
        description: 'L\'obtention de votre Numéro d\'Identité d\'Étranger (NIE) ou Carte d\'Identité (TIE) simplifiée.',
        image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=1400&q=80',
        content: '<h2>Numéro d\'Identité Étranger</h2><p>Le NIE est indispensable pour toute démarche administrative ou économique en Espagne.</p>',
        requirements: ['Formulaire EX-15', 'Passeport', 'Justificatif du motif de la demande'],
        infoSection: {
            mainCard: { title: "Besoin urgent d'un NIE espagnol ?", icon: <CreditCard className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Pourquoi le NIE ?", items: ["Ouvrir un **compte bancaire**", "Acheter un **véhicule ou immobilier**", "Signer un **contrat de travail**", "Créer une **entreprise**"] },
                { title: "Documents à préparer", items: ["**Passeport** entier et copie", "Formulaire **EX-15 / EX-17**", "Taxe **790 code 012** payée", "**Preuve du motif** (achat, travail, etc.)"] },
                { title: "Types de Démarches", items: ["**NIE Non-résident :** Pour intérêts", "**TIE :** Carte physique de résidence", "**Certificat Citoyen UE :** La carte verte", "**Prise d'empreintes :** Obligatoire pour TIE"] },
                { title: "Notre Processus Express", items: ["Chasse aux **rendez-vous difficiles**", "Remplissage **formulaires**", "Paiement anticipé des **taxes**", "Accompagnement **au commissariat**"] }
            ]
        }
    },
    'asile': {
        id: 'asile',
        title: 'Demande d\'Asile',
        subtitle: 'Autres Services',
        description: 'Un accompagnement juridique et humain pour vos démarches de protection internationale.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80',
        content: '<h2>Protection Internationale</h2><p>Nous vous aidons à constituer votre dossier de demande d\'asile en respectant toutes les procédures légales.</p>',
        requirements: ['Preuve d\'identité', 'Récit circonstancié', 'Déclaration de persécution'],
        infoSection: {
            mainCard: { title: "Vous cherchez une protection en Espagne ?", icon: <Shield className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Cadre Juridique", items: ["Protection **contre l'expulsion**", "Carte **Rouge** provisoire", "Droit de **travailler après 6 mois**", "Dossier traité par **l'OAR**"] },
                { title: "Éléments du Dossier", items: ["**Passeport** ou document d'identité", "**Récit écrit** détaillé", "**Preuves matérielles** des risques", "**Photos et témoignages** pertinents"] },
                { title: "Critères de Protection", items: ["**Exil :** En dehors du pays d'origine", "**Crainte :** Sur des persécutions", "**Motifs :** Race, religion, politique, etc.", "**Urgence :** Demande dans les temps"] },
                { title: "Soutien et Défense", items: ["Travail sur le **récit**", "Préparation à l'**interview officielle**", "Défense en cas de **refus initial**", "Suivi des **Cartes Rouges**"] }
            ]
        }
    },
    'citoyennete': {
        id: 'citoyennete',
        title: 'Citoyenneté Espagnole',
        subtitle: 'Autres Services',
        description: 'Devenez citoyen espagnol. Nous préparons votre dossier de naturalisation.',
        image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=1400&q=80',
        content: '<h2>Naturalisation et Citoyenneté</h2><p>L\'aboutissement de votre parcours d\'intégration : la nationalité espagnole.</p>',
        requirements: ['10 ans de résidence (variable selon origine)', 'Diplôme DELE A2', 'Examen CCSE'],
        infoSection: {
            mainCard: { title: "Prêt à devenir citoyen espagnol ?", icon: <Flag className="w-9 h-9 text-white stroke-[2]" />, btnText: "Évaluer mon dossier" },
            cards: [
                { title: "Avantages du Passeport", items: ["Liberté de **circulation mondiale**", "Droit de **vote aux élections**", "Transmission à **vos enfants**", "Liberté de **résidence dans toute l'UE**"] },
                { title: "Dossier de Naturalisation", items: ["Certificats **CCSE et DELE** réussis", "**Casier judiciaire** du pays d'origine", "Actes de **naissance légalisés**", "Justificatifs de **résidence**"] },
                { title: "Les Délais de Résidence", items: ["**Règle Générale :** 10 ans de résidence", "**Réfugiés :** 5 ans", "**Pays Iberoaméricains :** 2 ans", "**Mariage avec Espagnol(e) :** 1 an"] },
                { title: "Notre Processus", items: ["Inscription aux examens **Cervantes**", "Révision du **dossier télématique**", "Présentation via le registre **ministériel**", "Action en justice si **retard démesuré**"] }
            ]
        }
    }
};
