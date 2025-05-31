import type { ProductDTO } from '@src/interfaces/ProductoDto'

// Use existing types from ProductDTO
type RichTextBlockDTO = ProductDTO['descripcion'][0]

/**
 * Renders rich text content to HTML string
 * @param richText - Array of rich text blocks from Strapi
 * @param fallbackAlt - Fallback alt text for images and videos
 * @returns HTML string or null if no content
 */
export const renderRichText = (richText: RichTextBlockDTO[], fallbackAlt = 'Contenido multimedia'): string | null => {
  if (!richText || !Array.isArray(richText)) return null

  return richText.map((item) => {
    // Handle paragraphs
    if (item.type === 'paragraph') {
      return item.children.map((child) => {
        if (child.text === '') {
          return '<br><br>'
        }

        let text = child.text || ''
        if (child.bold) {
          text = `<strong>${text}</strong>`
        }
        if (child.italic) {
          text = `<em>${text}</em>`
        }
        if (child.underline) {
          text = `<u>${text}</u>`
        }
        if (child.strikethrough) {
          text = `<s>${text}</s>`
        }
        if (child.code) {
          text = `<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">${text}</code>`
        }
        return `<p>${text}</p>`
      }).join('')
    }

    // Handle headings
    if (item.type === 'heading') {
      const text = item.children[0]?.text || ''
      let formattedText = text

      // Apply formatting to heading text
      if (item.children[0]?.bold) formattedText = `<strong>${formattedText}</strong>`
      if (item.children[0]?.italic) formattedText = `<em>${formattedText}</em>`
      if (item.children[0]?.underline) formattedText = `<u>${formattedText}</u>`

      const headingClasses = {
        1: 'text-3xl font-bold text-gray-900 mt-8 mb-4',
        2: 'text-2xl font-bold text-gray-900 mt-6 mb-3',
        3: 'text-xl font-bold text-gray-900 mt-5 mb-3',
        4: 'text-lg font-bold text-gray-900 mt-4 mb-2',
        5: 'text-base font-bold text-gray-900 mt-3 mb-2',
        6: 'text-sm font-bold text-gray-900 mt-2 mb-1'
      }

      const level = item.level || 1
      const className = headingClasses[level as keyof typeof headingClasses] || headingClasses[1]
      const tag = `h${Math.min(level, 6)}`

      return `<${tag} class="${className}">${formattedText}</${tag}>`
    }

    // Handle images
    if (item.type === 'image' && item.image?.url) {
      return `<div class="my-8 flex justify-center">
        <img
          src="${item.image.url}"
          alt="${item.image.alternativeText || fallbackAlt}"
          class="max-w-full max-h-96 w-auto h-auto rounded-xl shadow-lg border border-gray-200 object-contain"
          loading="lazy"
        />
      </div>`
    }

    // Handle quotes
    if (item.type === 'quote') {
      const text = item.children?.map(child => {
        let childText = child.text || ''
        if (child.bold) childText = `<strong>${childText}</strong>`
        if (child.italic) childText = `<em>${childText}</em>`
        return childText
      }).join('') || ''

      return `<blockquote class="relative p-6 my-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-lg italic text-gray-700">"${text}"</p>
      </blockquote>`
    }

    // Handle lists
    if (item.type === 'list') {
      const listItems = item.children.map(child =>
        `<li class="mb-1">${child.text || ''}</li>`
      ).join('')

      if (item.format === 'ordered') {
        return `<ol class="list-decimal list-inside my-4 space-y-1">${listItems}</ol>`
      } else {
        return `<ul class="list-disc list-inside my-4 space-y-1">${listItems}</ul>`
      }
    }

    return ''
  }).join('')
}
