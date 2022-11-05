"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const faker_1 = require("@faker-js/faker");
(async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(user_service_1.UserService);
    const password = await bcrypt.hash("12345678A", 12);
    for (let i = 0; i < 30; i++) {
        await userService.save({
            first_name: faker_1.faker.name.firstName(),
            last_name: faker_1.faker.name.lastName(),
            email: faker_1.faker.internet.email(),
            password,
            is_ambassador: true
        });
    }
    process.exit();
})();
//# sourceMappingURL=ambassador.seeder.js.map