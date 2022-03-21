import { Mod } from "@cicada-lang/lambda/lib/lang/mod"
import { Parser } from "@cicada-lang/lambda/lib/lang/parser"
import { ParsingError } from "@cicada-lang/sexp/lib/errors"

export class PlaygroundState {
  text = ""
  mod?: Mod
  _name?: string
  error?: {
    kind: string
    message: string
  }
}
