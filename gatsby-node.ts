// turn off source-maps
exports.onCreateWebpackConfig = ({ actions, stage }: any) => {
    if (stage === 'build-javascript') {
        actions.setWebpackConfig({
            devtool: false
        })
    }
};