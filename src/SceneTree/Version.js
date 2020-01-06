/** Class representing a version */
class Version {
  /**
   * Create a bin reader.
   * @param {str} versionStr - The version string value.
   */
  constructor(versionStr) {
    if (versionStr) {
      const parts = versionStr.split('-')
      const numbers = parts[0].split('.')
      this.major = parseInt(numbers[0])
      this.minor = parseInt(numbers[1])
      this.patch = parseInt(numbers[2])
      if (parts.length == 2) this.branch = parts[1];
    } else {
      this.major = 0
      this.minor = 0
      this.patch = 0
    }
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  equals(numbers) {
    return !(
      this.patch == numbers[2] &&
      this.minor == numbers[1] &&
      this.major == numbers[0]
    )
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  lessThan(numbers) {
    return (
      this.patch < numbers[2] ||
      this.minor < numbers[1] ||
      this.major < numbers[0]
    )
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  greaterThan(numbers) {
    return (
      this.patch > numbers[2] ||
      this.minor > numbers[1] ||
      this.major > numbers[0]
    )
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  greaterOrEqualThan(numbers) {
    return (
      this.patch >= numbers[2] ||
      this.minor >= numbers[1] ||
      this.major >= numbers[0]
    )
  }
}

export { Version }
