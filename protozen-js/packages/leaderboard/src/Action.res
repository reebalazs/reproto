type result = State.result

type action =
  | AddResult({name: string, score: int})
  | UpdateResult({result: result, name: string, score: int})
  | RemoveResult(result)
  | EditMode(result)
  | AddMode
  | ShowMode
