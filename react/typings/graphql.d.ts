declare module '*.graphql' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import type { DocumentNode } from 'graphql'
  
    const value: DocumentNode
    export default value
  }