export interface Staff {
  id: number;
  name: string;
  title: string;
  image: string;
  link?: string;
}

export interface FederationDataItem {
  id: number;
  title: string;
  description: string;
  supportingText: string;
  link: string;
  thumbnail: string;
  offices: Office[];
  staff: Staff[];
}

export interface Office {
  id: number;
  title: string;
  description: string;
  supportingText: string;
  link: string;
  staff: Staff[];
}

export const federationData: FederationDataItem[] = [
  {
    id: 1,
    title: 'ΟΤΕΥ',
    description: 'Ομοσπονδιακό Τμήμα Εσωτερικών Υποθέσεων',
    supportingText: '',
    link: '/otey',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    staff: [
      {
        id: 1,
        name: 'ΜΗΤΣΟΤΑΚΗΣ ΚΥΡΙΑΚΟΣ',
        title: 'ΣΥΜΒΟΥΛΟΣ ΟΤΕΥ',
        image: 'https://mikropragmata-assets.lifo.gr/wp-content/uploads/2023/12/407476554_10232899470891605_9137350414539873679_n-758x426.jpg',
        link: '#',
      },
    ],
    offices: [
      {
        id: 1,
        title: 'ΓΓ-ΟΤΕΥ',
        description: 'Γενική Γραμματεία Ομοσπονδιακού Τμήματος Εσωτερικών Υποθέσεων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 2,
        title: 'Γραφείο Καταπολέμησης Ρατσισμού',
        description: '',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 3,
        title: 'ΟΙΑΑ',
        description: 'Ομοσπονδιακό Γραφείο Ισότητας Ατόμων με Αναπηρίες',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 4,
        title: 'ΕΕΡ',
        description: 'Επιτροπή κατά του Ρατσισμού',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 5,
        title: 'ΕΠΠΝ',
        description: 'Επιτροπή για τα Παιδιά και τους Νέους',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 6,
        title: 'ΕΟΟ',
        description: 'Επιτροπή Οικογενειακών Υποθέσεων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 7,
        title: 'ΕΕΕΑ',
        description: 'Επιτροπή Επαγγελματικών Παροχών',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 8,
        title: 'ΕΔΙΙΕ',
        description: 'Επιτροπή Διασφάλισης Ποιότητας Ιατρικών Εκθέσεων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 9,
        title: 'ΕΓΘ',
        description: 'Επιτροπή Γυναικείων Θεμάτων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 10,
        title: 'ΟΑΚ',
        description: 'Ομοσπονδιακό Γραφείο Ασφάλειας Τροφίμων και Κτηνιατρικής',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 11,
        title: 'ΟΙΦ',
        description: 'Ομοσπονδιακό Γραφείο Ισότητας Φύλων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 12,
        title: 'ΟΠΟ',
        description: 'Ομοσπονδιακό Γραφείο Πολιτισμού',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 13,
        title: 'ΟΔΥ',
        description: 'Ομοσπονδιακό Γραφείο Δημόσιας Υγείας',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 14,
        title: 'ΕΠΠ',
        description: 'Επιτροπή Ποιότητας',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 15,
        title: 'ΟΚΑ',
        description: 'Ομοσπονδιακό Γραφείο Κοινωνικών Ασφαλίσεων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 16,
        title: 'ΕλλΣτατ',
        description: 'Ομοσπονδιακή Ελληνική Στατιστική Υπηρεσία',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 17,
        title: 'ΙΙΙ',
        description: 'Ινστιτούτο Ιολογίας και Ανοσολογίας',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 18,
        title: 'ΕΕΣ',
        description: 'Επιτροπή Εποπτείας Συντάξεων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 19,
        title: 'Θεραπευτικό',
        description: 'Ελληνικός Οργανισμός Θεραπευτικών Προϊόντων',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 20,
        title: 'ΑρχείαΕλλ',
        description: 'Ελληνικά Ομοσπονδιακά Αρχεία',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 21,
        title: 'Παρατηρητήριο Υγείας',
        description: '',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 22,
        title: 'Μετεω',
        description: 'Ελληνικό Μετεωρολογικό Ινστιτούτο',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 23,
        title: 'ΕΕΒ',
        description: 'Ελληνική Εθνική Βιβλιοθήκη',
        supportingText: '',
        link: '#',
        staff: [],
      },
      {
        id: 24,
        title: 'Ταμείο Ελέγχου Καπνού',
        description: '',
        supportingText: '',
        link: '#',
        staff: [],
      },
    ],
  },
  {
    id: 2,
    title: 'ΟΤΑΠΠΑ',
    description: 'Ομοσπονδιακό Τμήμα Άμυνας, Πολιτικής Προστασίας & Αθλητισμού',
    supportingText: '',
    link: '/otappa',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 3,
    title: 'ΟΤΔΙΑ',
    description: 'Ομοσπονδιακό Τμήμα Αστυνομίας & Δικαιοσύνης',
    supportingText: '',
    link: '/otdia',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 4,
    title: 'ΟΤΟΙΚ',
    description: 'Ομοσπονδιακό Τμήμα Οικονομικών',
    supportingText: '',
    link: '/otoik',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 5,
    title: 'ΟΤΟΕΑ',
    description: 'Ομοσπονδιακό Τμήμα Οικονομικών Υποθέσεων, Εκπαίδευσης & Έρευνας',
    supportingText: '',
    link: '/otoea',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 6,
    title: 'ΟΤΕΞ',
    description: 'Ομοσπονδιακό Τμήμα Εξωτερικών Υποθέσεων',
    supportingText: '',
    link: '/otex',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 7,
    title: 'ΟΤΜΠΥ',
    description: 'Ομοσπονδιακό Τμήμα Περιβάλλοντος, Μεταφορών, Ενέργειας & Επικοινωνιών',
    supportingText: '',
    link: '/otmpy',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 8,
    title: 'Ομοσπονδιακό Συμβούλιο',
    description: '',
    supportingText: '',
    link: '/omosym',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 9,
    title: 'Η Βουλή των Ελλήνων',
    description: '',
    supportingText: '',
    link: '/parliament',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
  {
    id: 10,
    title: 'Η Συγκλισία της Ελλάδας',
    description: '',
    supportingText: '',
    link: '/senete',
    thumbnail: '/src/assets/Coat_of_arms_of_Greece.svg',
    offices: [],
    staff: [],
  },
];
