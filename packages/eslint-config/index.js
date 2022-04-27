/*
 * Copyright 2019 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from "path";

import * as eslintBuiltinRules from "./eslint-builtin-rules.json";
import * as eslintPluginRules from "./eslint-plugin-rules.json";
import * as tsEslintRules from "./typescript-eslint-rules.json";

/**
 * Enable @blueprintjs/eslint-plugin.
 * For TS files, configure typescript-eslint, including type-aware lint rules which use the TS program.
 */
export default {
    plugins: ["@blueprintjs", "header", "import", "jsdoc", "react"],
    extends: ["plugin:@blueprintjs/recommended", "plugin:import/typescript"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    settings: {
        "import/internal-regex": "^@blueprintjs",
    },
    rules: {
        // HACKHACK: this rule impl has too many false positives
        "@blueprintjs/classes-constants": "off",
        ...eslintBuiltinRules,
        ...eslintPluginRules,
    },
    overrides: [
        {
            files: ["*.js"],
            env: {
                node: true,
                es6: true,
            },
            rules: {
                "import/no-default-export": "off",
            },
        },
        {
            files: ["**/*.{ts,tsx}"],
            env: {
                browser: true,
            },
            plugins: ["@typescript-eslint", "@typescript-eslint/tslint", "deprecation"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: ["{src,test}/tsconfig.json"],
            },
            rules: {
                // run the tslint rules which are not yet converted (run inside eslint)
                "@typescript-eslint/tslint/config": [
                    "error",
                    {
                        lintFile: path.resolve(__dirname, "./tslint.json"),
                    },
                ],
                ...tsEslintRules,
                "deprecation/deprecation": "error",
            },
        },
        {
            files: ["**/test/**/*.{ts,tsx}", "**/test/*.{ts,tsx}"],
            env: {
                browser: true,
                mocha: true,
            },
            rules: {
                "react/display-name": "off",
                "react/jsx-no-bind": "off",
                "react/no-find-dom-node": "off",
            },
        },
    ],
};
