module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "settings" : {
        "react": {
            "version": "detect"
        }
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "eslint:recommended", 
        "next"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars" : false,
        // "quotes" : [1 , "single"] 
    }
}
