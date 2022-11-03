import React, { useState } from 'react'

interface CollapseTextProps {
  text: string
  expandText: string
  contractText: string
  collapseLength: number
}

export const CollapseText: StorefrontFunctionComponent<CollapseTextProps> = ({
  text,
  expandText,
  contractText,
  collapseLength,
}: CollapseTextProps) => {
  const [isContentShow, setIsContentShow] = useState(false)

  const length = Number(collapseLength) || 0

  const mustRenderButton = !!text && text?.length > length

  const formatText = () => {
    if (isContentShow) return text

    return `${text.substring(0, length)}...`
  }

  return (
    <>
      <p>{formatText()}</p>
      {mustRenderButton && (
        <button
          style={{
            fontFamily: 'Roboto',
            border: 'none',
            marginBottom: '20px',
            backgroundColor: 'transparent',
            fontWeight: '600',
            color: '#0B1658',
          }}
          onClick={() => setIsContentShow(!isContentShow)}
        >
          {isContentShow ? contractText : expandText}
        </button>
      )}
    </>
  )
}

CollapseText.getSchema = () => {
  return {
    title: 'Description SEO',
    description: 'description',
    type: 'object',
    properties: {
      text: {
        type: 'string',
        title: 'Text Seo',
      },
      expandText: {
        type: 'string',
        title: 'Text of button expand',
        default: 'Leggi tutto',
      },
      contractText: {
        type: 'string',
        title: 'Text of button contract',
        default: 'Leggi meno',
      },
      collapseLength: {
        type: 'integer',
        title: 'Collapse Text Length',
      },
    },
    required: ['text', 'collapseLength'],
  }
}
