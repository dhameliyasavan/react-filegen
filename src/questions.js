module.exports = {
    componentLevelQuestions: [
        {
            type: 'input',
            name: 'component.path',
            message: 'Set the default path directory to where your components will be generated in?',
            default: () => 'src/components',
        },
        {
            type: 'confirm',
            name: 'component.withStyle',
            message: 'Would you like to create a corresponding stylesheet file with each component you generate?',
        },
        {
            type: 'confirm',
            name: 'component.withClass',
            message: 'Would you like to create a each class component?',
        },
    ],
    reducerLevelQuestions: [
        {
            type: 'input',
            name: 'reducer.path',
            message: 'Set the default path directory to where your reducers will be generated in?',
            default: () => 'src/redux',
        },
    ]
}