class PasswordHandler extends StorageApi {
    constructor() { super() };

    hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);

        const hashArray = Array.from(new Uint8Array(hashBuffer));

        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        return hashHex;
    }

    comparePassword = async (user) => {
        const usersList = this.getData("users");

        if (usersList !== null) {
            const users = JSON.parse(usersList);

            const hashedPassword = await this.hashPassword(user?.Password);

            const storedUser = users?.find((item) => {
                return (item?.Password == hashedPassword && item?.Username == user?.Username);
            });

            if (!storedUser)
                return {};

            return storedUser;
        }
    }
}