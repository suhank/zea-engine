/**
 * Class designed to store version data. Widely used in the zea engine for backwards compatibility.
 */
class Version {
  major: number
  minor: number
  patch: number
  branch: string = ''
  /**
   * Creates a version.
   * The version string should have the following structure:
   * major, minor and patch separated by a dot(`.`) and parts separated by a dash(`-`).
   *
   * @param versionStr - The version string value.
   */
  constructor(versionStr: string = '') {
    if (versionStr) {
      const parts = versionStr.split('-')
      const numbers = parts[0].split('.')
      this.major = parseInt(numbers[0])
      this.minor = parseInt(numbers[1])
      this.patch = parseInt(numbers[2])
      if (parts.length == 2) this.branch = parts[1]
    } else {
      this.major = 0
      this.minor = 0
      this.patch = 0
    }
  }

  /**
   * Compare a version object against a version numbers array.
   *
   * @param numbers - An array containing 3 version numbers. [Major, Minor, Patch]
   * @return - return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2
   */
  compare(numbers: number[]) {
    // https://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
    // 2nd answer.
    const v1 = [this.major, this.minor, this.patch]
    for (let i = 0; i < 3; i++) {
      if (v1[i] !== numbers[i]) return v1[i] - numbers[i]
    }
    return 0
  }
}

export { Version }
