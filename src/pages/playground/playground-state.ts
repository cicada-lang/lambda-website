import { Mod, ModLoader } from "@cicada-lang/lambda/lib/lang/mod"
import { Parser } from "@cicada-lang/lambda/lib/lang/parser"
import { ParsingError } from "@cicada-lang/sexp/lib/errors"

export class PlaygroundState {
  loader = new ModLoader()

  text = ""
  mod: Mod
  output = ""
  error?: {
    kind: string
    message: string
  }

  constructor() {
    this.mod = this.load(this.text)
  }

  refresh(): void {
    try {
      delete this.error
      this.mod = this.load(this.text)
    } catch (error) {
      this.catchError(error)
    }
  }

  catchError(error: unknown): void {
    if (!(error instanceof Error)) throw error
    if (error instanceof ParsingError) {
      this.error = {
        kind: "ParsingError",
        message: error.message + "\n" + error.span.report(this.text),
      }
    } else {
      this.error = {
        kind: error.name,
        message: error.message,
      }
    }
  }

  load(text: string): Mod {
    const url = new URL(window.location.href)
    const mod = new Mod(url, { loader: this.loader })

    const parser = new Parser()

    const stmts = parser.parseStmts(text)
    for (const stmt of stmts) {
      stmt.execute(mod)
    }

    return mod
  }
}
