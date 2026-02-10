class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(name, email) {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    return this.userRepository.create({ name, email });
  }
}

module.exports = UserService;
