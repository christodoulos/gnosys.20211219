/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/auth/jwt-auth.guard.ts");
const local_auth_guard_1 = __webpack_require__("./apps/api/src/app/auth/local-auth.guard.ts");
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    getData() {
        return this.appService.getData();
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.login(req.user);
        });
    }
    getProfile(req) {
        return req.user;
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
tslib_1.__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('auth/login'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
tslib_1.__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('profile'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
AppController = tslib_1.__decorate([
    common_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const auth_module_1 = __webpack_require__("./apps/api/src/app/auth/auth.module.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/users/users.module.ts");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const path_1 = __webpack_require__("path");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'gnosys'),
                exclude: ['/api*'],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const jwt_strategy_1 = __webpack_require__("./apps/api/src/app/auth/jwt.strategy.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/api/src/app/users/user.schema.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const jsonwebtoken_1 = __webpack_require__("jsonwebtoken");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/api/src/app/users/user.schema.ts");
const mongoose_2 = __webpack_require__("mongoose");
const cryptr_1 = tslib_1.__importDefault(__webpack_require__("cryptr"));
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.cryptr = new cryptr_1.default(process.env.ENCRYPT_JWT_SECRET);
    }
    createAccessToken(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const accessToken = this.jwtService.sign({userId});
            const accessToken = jsonwebtoken_1.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            return this.encryptText(accessToken);
        });
    }
    validateUser(jwtPayload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({
                _id: jwtPayload.userId,
                emailVerified: true,
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not authorized.');
            }
            return user;
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { username: user.username, sub: user.userId };
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
    encryptText(text) {
        //   console.log(this.Cryptr('skata'));
        //   return this.cryptr.encrypt(text);
        return text;
    }
};
AuthService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/api/src/app/auth/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
};


/***/ }),

/***/ "./apps/api/src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const constants_1 = __webpack_require__("./apps/api/src/app/auth/constants.ts");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret,
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { userId: payload.sub, username: payload.username };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/api/src/app/auth/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends passport_1.AuthGuard('local') {
};
LocalAuthGuard = tslib_1.__decorate([
    common_1.Injectable()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/users/dto/create-user.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./apps/api/src/app/users/dto/login-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class LoginUserDto {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(255),
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(1024),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
exports.LoginUserDto = LoginUserDto;


/***/ }),

/***/ "./apps/api/src/app/users/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const validator_1 = tslib_1.__importDefault(__webpack_require__("validator"));
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
let User = class User {
};
tslib_1.__decorate([
    mongoose_1.Prop({
        lowercase: true,
        validate: validator_1.default.isEmail,
        maxlength: 256,
        minlength: 6,
        required: [true, 'BLANK_EMAIL'],
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ maxlength: 1024, minlength: 8, required: [true, 'BLANK_PASSWORD'] }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: [true, 'BLANK_GIVEN_NAME'] }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "givenName", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: [true, 'BLANK_FAMILY_NAME'] }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "familyName", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: ['user'] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ validate: validator_1.default.isUUID }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "verification", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "verificationExpires", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "loginAttempts", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "blockExpires", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
User = tslib_1.__decorate([
    mongoose_1.Schema()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified('password')) {
                return next();
            }
            const hashed = yield bcrypt.hash(this['password'], 10);
            this['password'] = hashed;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.UserSchema.virtual('uid').get(function () {
    return this._id.toHexString();
});
exports.UserSchema.virtual('displayName').get(function () {
    return `${this.givenName} ${this.familyName}`;
});
exports.UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.id;
    },
});
exports.UserSchema.set('timestamps', true);
exports.UserSchema.set('versionKey', false);


/***/ }),

/***/ "./apps/api/src/app/users/users.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_user_dto_1 = __webpack_require__("./apps/api/src/app/users/dto/create-user.dto.ts");
const login_user_dto_1 = __webpack_require__("./apps/api/src/app/users/dto/login-user.dto.ts");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    register(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.create(createUserDto);
        });
    }
    login(req, loginUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.login(req, loginUserDto);
        });
    }
};
tslib_1.__decorate([
    common_1.Post(),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
tslib_1.__decorate([
    common_1.Post('login'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    tslib_1.__param(0, common_1.Req()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Request !== "undefined" && Request) === "function" ? _b : Object, typeof (_c = typeof login_user_dto_1.LoginUserDto !== "undefined" && login_user_dto_1.LoginUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
UsersController = tslib_1.__decorate([
    common_1.Controller('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _d : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./apps/api/src/app/users/users.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const users_controller_1 = __webpack_require__("./apps/api/src/app/users/users.controller.ts");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
const user_schema_1 = __webpack_require__("./apps/api/src/app/users/user.schema.ts");
const auth_module_1 = __webpack_require__("./apps/api/src/app/auth/auth.module.ts");
let UsersModule = class UsersModule {
};
UsersModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/api/src/app/users/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const uuid_1 = __webpack_require__("uuid");
const date_fns_1 = __webpack_require__("date-fns");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
let UsersService = class UsersService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
        this.hours_to_verify = 4;
        this.login_attempts_to_block = 6;
        this.hours_to_block = 8;
    }
    create(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdUser = new this.userModel(createUserDto);
            yield this.isEmailUnique(createdUser.email);
            this.setRegistrationInfo(createdUser);
            return yield createdUser.save();
        });
    }
    login(req, loginUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmail(loginUserDto.email);
            this.isUserBlocked(user);
            yield this.checkPassword(loginUserDto.password, user);
            yield this.passwordsDoMatch(user);
            return {
                displayName: `${user.givenName} ${user.familyName}`,
                email: user.email,
                accessToken: yield this.authService.createAccessToken(user.email),
            };
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.find().exec();
        });
    }
    //
    // Private Methods
    //
    isEmailUnique(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email, verified: true });
            if (user) {
                throw new common_1.BadRequestException('User already exists.');
            }
        });
    }
    setRegistrationInfo(user) {
        user.verification = uuid_1.v4();
        user.verificationExpires = date_fns_1.addHours(new Date(), this.hours_to_verify);
    }
    findUserByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const user = await this.userModel.findOne({ email, verified: true });
            const user = yield this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.NotFoundException('Wrong email or password.');
            }
            return user;
        });
    }
    isUserBlocked(user) {
        if (user.blockExpires > Date.now()) {
            throw new common_1.ConflictException('User has been blocked, try again later.');
        }
    }
    checkPassword(attemptPass, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const match = yield bcrypt.compare(attemptPass, user.password);
            if (!match) {
                yield this.passwordsDoNotMatch(user);
                throw new common_1.NotFoundException('Wrong email or password.');
            }
            return match;
        });
    }
    passwordsDoNotMatch(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.loginAttempts += 1;
            yield user.save();
            if (user.loginAttempts >= this.login_attempts_to_block) {
                yield this.blockUser(user);
                throw new common_1.ConflictException('User blocked.');
            }
        });
    }
    blockUser(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.blockExpires = date_fns_1.addHours(new Date(), this.hours_to_block);
            yield user.save();
        });
    }
    passwordsDoMatch(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.loginAttempts = 0;
            yield user.save();
        });
    }
};
UsersService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_2.InjectModel('User')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cryptr":
/***/ ((module) => {

module.exports = require("cryptr");

/***/ }),

/***/ "date-fns":
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "validator":
/***/ ((module) => {

module.exports = require("validator");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map