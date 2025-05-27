// Para el campo 'descripcion' que es Rich Text
interface RichTextChildDTO {
    text: string;
    type: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }

  // Para los metadatos del proveedor de imágenes/videos (reutilizada)
  interface ProviderMetadataDTO {
    public_id: string;
    resource_type: string;
  }

  // Para los diferentes formatos de imagen (reutilizada)
  interface ImageFormatDTO {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: ProviderMetadataDTO;
  }

  // Definición más estricta para los formatos de imagen dentro de RichText
  interface RichTextImageFormatsDTO {
    small?: ImageFormatDTO;
    medium?: ImageFormatDTO;
    thumbnail?: ImageFormatDTO;
    [key: string]: ImageFormatDTO | undefined; // Permite otros formatos manteniendo el tipado
  }

  interface RichTextBlockDTO {
    type: string;
    children: RichTextChildDTO[];
    level?: number; // Para encabezados H1, H2, etc.
    format?: 'ordered' | 'unordered'; // Para listas (ejemplo de valores específicos)
    image?: {
      name: string;
      alternativeText?: string | null;
      caption?: string | null;
      width: number;
      height: number;
      formats: RichTextImageFormatsDTO | null; // Tipo específico en lugar de 'any'
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      provider: string;
      provider_metadata: ProviderMetadataDTO; // Asumiendo que sigue la misma estructura
      createdAt: string; // Asumiendo que las imágenes en RichText también tienen estos campos
      updatedAt: string;
      // ...otros campos de imagen si son diferentes de ImagenNestedDTO
    };
  }

  // Para los objetos dentro del array 'categorias'
  interface CategoriaNestedDTO {
    id: number;
    documentId: string;
    nombre: string;
    slug: string;
    descripcion: string | null;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    publishedAt: string; // ISO Date string
  }

  // Para el objeto 'marca'
  interface MarcaNestedDTO {
    id: number;
    documentId: string;
    nombre: string;
    slug: string;
    descripcion: string | null;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    publishedAt: string; // ISO Date string
  }

  // Para los objetos dentro del array 'imagenes'
  interface ImagenNestedDTO {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: RichTextImageFormatsDTO | null; // Reutilizando la definición de formatos
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: ProviderMetadataDTO;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    publishedAt: string; // ISO Date string
  }

// La interfaz principal para un producto
export interface ProductDTO {
    id: number;
    documentId: string;
    nombre: string;
    descripcion: RichTextBlockDTO[];
    descripcion_corta: string | null;
    precio: number;
    stock: number;
    slug: string;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    publishedAt: string; // ISO Date string
    sku: string;
    categorias: CategoriaNestedDTO[];
    marca: MarcaNestedDTO | null;
    imagenes: ImagenNestedDTO[] | null;
  }
