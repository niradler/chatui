import type { TranslationKeys } from '../types';

export const fr: TranslationKeys = {
  // Common
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Information',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    copy: 'Copier',
    share: 'Partager',
    export: 'Exporter',
    import: 'Importer',
    search: 'Rechercher',
    settings: 'Paramètres',
    close: 'Fermer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    retry: 'Réessayer',
    help: 'Aide',
    about: 'À propos',
    version: 'Version',
  },

  // App Specific
  app: {
    title: 'ChatUI',
    description: 'Interface de Chat IA Moderne',
    welcome: 'Bienvenue dans ChatUI ! Sélectionnez un modèle et commencez à discuter.',
    newChat: 'Nouveau Chat',
    chatHistory: 'Historique des Chats',
    noMessages: 'Aucun message pour le moment. Commencez une conversation !',
    typing: 'En train d\'écrire...',
    connecting: 'Connexion...',
    connected: 'Connecté',
    disconnected: 'Déconnecté',
    reconnecting: 'Reconnexion...',
  },

  // Chat Interface
  chat: {
    // Input
    inputPlaceholder: 'Tapez votre message ici...',
    sendMessage: 'Envoyer le message',
    voiceInput: 'Entrée vocale',
    uploadFile: 'Télécharger un fichier',
    uploadImage: 'Télécharger une image',
    
    // Messages
    messageFrom: 'Message de {{name}}',
    messageTime: 'Envoyé à {{time}}',
    messageActions: 'Actions du message',
    regenerate: 'Régénérer la réponse',
    stopGeneration: 'Arrêter la génération',
    copyMessage: 'Copier le message',
    shareMessage: 'Partager le message',
    likeMessage: 'J\'aime le message',
    dislikeMessage: 'Je n\'aime pas le message',
    
    // Chat Management
    deleteChat: 'Supprimer le chat',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce chat ? Cette action ne peut pas être annulée.',
    exportChat: 'Exporter le chat',
    shareChat: 'Partager le chat',
    clearChat: 'Effacer le chat',
    clearConfirm: 'Êtes-vous sûr de vouloir effacer tous les messages ? Cette action ne peut pas être annulée.',
    chatTitle: 'Titre du chat',
    renameChat: 'Renommer le chat',
    
    // Prompts
    suggestedPrompts: 'Suggestions',
    tryPrompt: 'Essayer cette suggestion',
  },

  // Models
  models: {
    selectModel: 'Sélectionner un modèle',
    currentModel: 'Modèle actuel : {{model}}',
    noModels: 'Aucun modèle disponible',
    loadingModels: 'Chargement des modèles...',
    modelInfo: 'Informations du modèle',
    modelSize: 'Taille : {{size}}',
    modelModified: 'Modifié : {{date}}',
    switchModel: 'Passer à {{model}}',
  },

  // Settings
  settings: {
    title: 'Paramètres',
    appearance: 'Apparence',
    language: 'Langue',
    theme: 'Thème',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    themeAuto: 'Automatique',
    
    // Chat Settings
    chatSettings: 'Paramètres du Chat',
    maxMessages: 'Nombre maximum de messages à afficher',
    autoSave: 'Sauvegarde automatique',
    showTimestamps: 'Afficher les horodatages',
    showCharacterCount: 'Afficher le nombre de caractères',
    streamingEnabled: 'Activer les réponses en temps réel',
    
    // Accessibility
    accessibility: 'Accessibilité',
    screenReader: 'Support pour lecteur d\'écran',
    keyboardNavigation: 'Navigation au clavier',
    highContrast: 'Mode haut contraste',
    largeText: 'Texte large',
    
    // Advanced
    advanced: 'Avancé',
    debugMode: 'Mode débogage',
    performanceMetrics: 'Métriques de performance',
    resetSettings: 'Réinitialiser les paramètres',
    resetConfirm: 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres aux valeurs par défaut ?',
  },

  // Sidebar
  sidebar: {
    toggle: 'Basculer la barre latérale',
    newChat: 'Nouveau chat',
    chatHistory: 'Historique des chats',
    settings: 'Paramètres',
    export: 'Exporter',
    share: 'Partager',
    upgrade: 'Mise à niveau',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
  },

  // Errors
  errors: {
    // Server Errors
    serverOffline: 'Le serveur Ollama n\'est pas en marche. Veuillez démarrer votre serveur Ollama et réessayer.',
    noModels: 'Aucun modèle trouvé. Veuillez installer au moins un modèle en utilisant "ollama pull nom-du-modèle".',
    requestFailed: 'Échec de la réponse du serveur Ollama.',
    networkError: 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.',
    modelNotFound: 'Le modèle sélectionné n\'est pas disponible. Veuillez choisir un autre modèle.',
    timeoutError: 'Délai d\'attente dépassé. Veuillez réessayer.',
    
    // Chat Errors
    chatLoadFailed: 'Échec du chargement de l\'historique des chats.',
    chatSaveFailed: 'Échec de la sauvegarde du chat.',
    chatDeleteFailed: 'Échec de la suppression du chat.',
    messageLoadFailed: 'Échec du chargement des messages.',
    messageSendFailed: 'Échec de l\'envoi du message.',
    
    // File Errors
    fileUploadFailed: 'Échec du téléchargement du fichier.',
    fileNotSupported: 'Type de fichier non pris en charge.',
    fileTooLarge: 'Le fichier est trop volumineux.',
    
    // General Errors
    unknownError: 'Une erreur inconnue s\'est produite.',
    permissionDenied: 'Permission refusée.',
    configurationError: 'Erreur de configuration.',
  },

  // Success Messages
  success: {
    copied: 'Contenu copié dans le presse-papiers !',
    chatExported: 'Chat exporté avec succès !',
    chatShared: 'Chat partagé avec succès !',
    chatDeleted: 'Chat supprimé avec succès !',
    chatRenamed: 'Chat renommé avec succès !',
    settingsSaved: 'Paramètres sauvegardés avec succès !',
    modelChanged: 'Modèle changé avec succès !',
    fileUploaded: 'Fichier téléchargé avec succès !',
  },

  // Accessibility
  accessibility: {
    // Screen Reader Labels
    chatInput: 'Champ de saisie du chat',
    sendButton: 'Bouton envoyer le message',
    messageList: 'Liste des messages du chat',
    sidebarToggle: 'Bouton basculer la barre latérale',
    modelSelector: 'Sélecteur de modèle déroulant',
    themeToggle: 'Bouton basculer le thème',
    
    // Actions
    clickToExpand: 'Cliquer pour développer',
    clickToCollapse: 'Cliquer pour réduire',
    messageOptions: 'Options du message',
    chatOptions: 'Options du chat',
    
    // Status
    chatLoading: 'Le chat se charge',
    modelLoading: 'Le modèle se charge',
    messageLoading: 'Le message se charge',
    
    // Navigation
    goToTop: 'Aller en haut',
    goToBottom: 'Aller en bas',
    previousMessage: 'Message précédent',
    nextMessage: 'Message suivant',
  },

  // Time and Dates
  time: {
    now: 'maintenant',
    minuteAgo: 'il y a 1 minute',
    minutesAgo: 'il y a {{count}} minutes',
    hourAgo: 'il y a 1 heure',
    hoursAgo: 'il y a {{count}} heures',
    dayAgo: 'il y a 1 jour',
    daysAgo: 'il y a {{count}} jours',
    weekAgo: 'il y a 1 semaine',
    weeksAgo: 'il y a {{count}} semaines',
    monthAgo: 'il y a 1 mois',
    monthsAgo: 'il y a {{count}} mois',
    yearAgo: 'il y a 1 an',
    yearsAgo: 'il y a {{count}} ans',
  },

  // File Types
  fileTypes: {
    image: 'Image',
    document: 'Document',
    text: 'Fichier texte',
    code: 'Fichier de code',
    archive: 'Archive',
    video: 'Vidéo',
    audio: 'Audio',
    unknown: 'Type de fichier inconnu',
  },

  // Keyboard Shortcuts
  shortcuts: {
    newChat: 'Ctrl+N - Nouveau chat',
    sendMessage: 'Ctrl+Entrée - Envoyer le message',
    focusInput: 'Ctrl+I - Focaliser la saisie',
    toggleSidebar: 'Ctrl+B - Basculer la barre latérale',
    toggleTheme: 'Ctrl+T - Basculer le thème',
    scrollToTop: 'Début - Défiler vers le haut',
    scrollToBottom: 'Fin - Défiler vers le bas',
  },
};

export default fr;
