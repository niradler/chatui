import type { TranslationKeys } from '../types';

export const es: TranslationKeys = {
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Información',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    copy: 'Copiar',
    share: 'Compartir',
    export: 'Exportar',
    import: 'Importar',
    search: 'Buscar',
    settings: 'Configuración',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    retry: 'Reintentar',
    help: 'Ayuda',
    about: 'Acerca de',
    version: 'Versión',
  },

  // App Specific
  app: {
    title: 'ChatUI',
    description: 'Interfaz de Chat con IA Moderna',
    welcome: '¡Bienvenido a ChatUI! Selecciona un modelo y comienza a chatear.',
    newChat: 'Nuevo Chat',
    chatHistory: 'Historial de Chat',
    noMessages: 'Aún no hay mensajes. ¡Inicia una conversación!',
    typing: 'Escribiendo...',
    connecting: 'Conectando...',
    connected: 'Conectado',
    disconnected: 'Desconectado',
    reconnecting: 'Reconectando...',
  },

  // Chat Interface
  chat: {
    // Input
    inputPlaceholder: 'Escribe tu mensaje aquí...',
    sendMessage: 'Enviar mensaje',
    voiceInput: 'Entrada de voz',
    uploadFile: 'Subir archivo',
    uploadImage: 'Subir imagen',
    
    // Messages
    messageFrom: 'Mensaje de {{name}}',
    messageTime: 'Enviado a las {{time}}',
    messageActions: 'Acciones del mensaje',
    regenerate: 'Regenerar respuesta',
    stopGeneration: 'Detener generación',
    copyMessage: 'Copiar mensaje',
    shareMessage: 'Compartir mensaje',
    likeMessage: 'Me gusta',
    dislikeMessage: 'No me gusta',
    
    // Chat Management
    deleteChat: 'Eliminar chat',
    deleteConfirm: '¿Estás seguro de que quieres eliminar este chat? Esta acción no se puede deshacer.',
    exportChat: 'Exportar chat',
    shareChat: 'Compartir chat',
    clearChat: 'Limpiar chat',
    clearConfirm: '¿Estás seguro de que quieres limpiar todos los mensajes? Esta acción no se puede deshacer.',
    chatTitle: 'Título del chat',
    renameChat: 'Renombrar chat',
    
    // Prompts
    suggestedPrompts: 'Sugerencias',
    tryPrompt: 'Probar esta sugerencia',
  },

  // Models
  models: {
    selectModel: 'Seleccionar un modelo',
    currentModel: 'Modelo actual: {{model}}',
    noModels: 'No hay modelos disponibles',
    loadingModels: 'Cargando modelos...',
    modelInfo: 'Información del modelo',
    modelSize: 'Tamaño: {{size}}',
    modelModified: 'Modificado: {{date}}',
    switchModel: 'Cambiar a {{model}}',
  },

  // Settings
  settings: {
    title: 'Configuración',
    appearance: 'Apariencia',
    language: 'Idioma',
    theme: 'Tema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    themeAuto: 'Automático',
    
    // Chat Settings
    chatSettings: 'Configuración del Chat',
    maxMessages: 'Máximo de mensajes a mostrar',
    autoSave: 'Guardar automáticamente',
    showTimestamps: 'Mostrar marcas de tiempo',
    showCharacterCount: 'Mostrar conteo de caracteres',
    streamingEnabled: 'Habilitar respuestas en tiempo real',
    
    // Accessibility
    accessibility: 'Accesibilidad',
    screenReader: 'Soporte para lector de pantalla',
    keyboardNavigation: 'Navegación por teclado',
    highContrast: 'Modo de alto contraste',
    largeText: 'Texto grande',
    
    // Advanced
    advanced: 'Avanzado',
    debugMode: 'Modo de depuración',
    performanceMetrics: 'Métricas de rendimiento',
    resetSettings: 'Restablecer configuración',
    resetConfirm: '¿Estás seguro de que quieres restablecer toda la configuración a los valores predeterminados?',
  },

  // Sidebar
  sidebar: {
    toggle: 'Alternar barra lateral',
    newChat: 'Nuevo chat',
    chatHistory: 'Historial de chat',
    settings: 'Configuración',
    export: 'Exportar',
    share: 'Compartir',
    upgrade: 'Actualizar',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
  },

  // Errors
  errors: {
    // Server Errors
    serverOffline: 'El servidor Ollama no está funcionando. Por favor, inicia tu servidor Ollama e inténtalo de nuevo.',
    noModels: 'No se encontraron modelos. Por favor, instala al menos un modelo usando "ollama pull nombre-modelo".',
    requestFailed: 'Error al obtener respuesta del servidor Ollama.',
    networkError: 'Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.',
    modelNotFound: 'El modelo seleccionado no está disponible. Por favor, elige un modelo diferente.',
    timeoutError: 'Se agotó el tiempo de espera. Por favor, inténtalo de nuevo.',
    
    // Chat Errors
    chatLoadFailed: 'Error al cargar el historial de chat.',
    chatSaveFailed: 'Error al guardar el chat.',
    chatDeleteFailed: 'Error al eliminar el chat.',
    messageLoadFailed: 'Error al cargar los mensajes.',
    messageSendFailed: 'Error al enviar el mensaje.',
    
    // File Errors
    fileUploadFailed: 'Error al subir el archivo.',
    fileNotSupported: 'Tipo de archivo no compatible.',
    fileTooLarge: 'El archivo es demasiado grande.',
    
    // General Errors
    unknownError: 'Ocurrió un error desconocido.',
    permissionDenied: 'Permiso denegado.',
    configurationError: 'Error de configuración.',
  },

  // Success Messages
  success: {
    copied: '¡Contenido copiado al portapapeles!',
    chatExported: '¡Chat exportado exitosamente!',
    chatShared: '¡Chat compartido exitosamente!',
    chatDeleted: '¡Chat eliminado exitosamente!',
    chatRenamed: '¡Chat renombrado exitosamente!',
    settingsSaved: '¡Configuración guardada exitosamente!',
    modelChanged: '¡Modelo cambiado exitosamente!',
    fileUploaded: '¡Archivo subido exitosamente!',
  },

  // Accessibility
  accessibility: {
    // Screen Reader Labels
    chatInput: 'Campo de entrada del chat',
    sendButton: 'Botón enviar mensaje',
    messageList: 'Lista de mensajes del chat',
    sidebarToggle: 'Botón alternar barra lateral',
    modelSelector: 'Selector de modelo desplegable',
    themeToggle: 'Botón alternar tema',
    
    // Actions
    clickToExpand: 'Hacer clic para expandir',
    clickToCollapse: 'Hacer clic para contraer',
    messageOptions: 'Opciones del mensaje',
    chatOptions: 'Opciones del chat',
    
    // Status
    chatLoading: 'El chat se está cargando',
    modelLoading: 'El modelo se está cargando',
    messageLoading: 'El mensaje se está cargando',
    
    // Navigation
    goToTop: 'Ir al inicio',
    goToBottom: 'Ir al final',
    previousMessage: 'Mensaje anterior',
    nextMessage: 'Mensaje siguiente',
  },

  // Time and Dates
  time: {
    now: 'ahora',
    minuteAgo: 'hace 1 minuto',
    minutesAgo: 'hace {{count}} minutos',
    hourAgo: 'hace 1 hora',
    hoursAgo: 'hace {{count}} horas',
    dayAgo: 'hace 1 día',
    daysAgo: 'hace {{count}} días',
    weekAgo: 'hace 1 semana',
    weeksAgo: 'hace {{count}} semanas',
    monthAgo: 'hace 1 mes',
    monthsAgo: 'hace {{count}} meses',
    yearAgo: 'hace 1 año',
    yearsAgo: 'hace {{count}} años',
  },

  // File Types
  fileTypes: {
    image: 'Imagen',
    document: 'Documento',
    text: 'Archivo de texto',
    code: 'Archivo de código',
    archive: 'Archivo comprimido',
    video: 'Video',
    audio: 'Audio',
    unknown: 'Tipo de archivo desconocido',
  },

  // Keyboard Shortcuts
  shortcuts: {
    newChat: 'Ctrl+N - Nuevo chat',
    sendMessage: 'Ctrl+Enter - Enviar mensaje',
    focusInput: 'Ctrl+I - Enfocar entrada',
    toggleSidebar: 'Ctrl+B - Alternar barra lateral',
    toggleTheme: 'Ctrl+T - Alternar tema',
    scrollToTop: 'Inicio - Desplazar al inicio',
    scrollToBottom: 'Fin - Desplazar al final',
  },
};

export default es;
