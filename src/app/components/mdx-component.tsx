'use client'

import { CodeBlock } from './code-block'
import { ReactNode } from 'react'

interface PreProps {
  children: ReactNode
}

interface CodeProps {
  children: ReactNode
  className?: string
}

export const mdxComponents = {
  pre: (props: PreProps) => <CodeBlock>{props.children}</CodeBlock>,
  code: (props: CodeProps) => {
    return (
      <code className={props.className}>
        {props.children}
      </code>
    )
  }
}