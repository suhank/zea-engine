export function jsonCompare(json_correct: Record<string, any>, json_to_test: Record<string, any>) {
  for (let val in json_correct) {
    if (json_correct.val !== json_to_test.val) {
      console.log('incorrect value: ', json_correct.val, ' vs ', json_to_test.val)
      return false
    }
  }
  return true
}