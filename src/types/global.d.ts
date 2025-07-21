// global.d.ts
interface Window {
  suplinkDebug?: {
    refresh?: () => void
  }
}
export {} // 这个很重要，让 TypeScript 知道这是一个模块
