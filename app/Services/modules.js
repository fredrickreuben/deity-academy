class Modules {
    async has_access_accounting(user) {
        const _user = await user.load({
            modules: (builder) => builder.where('slug', 'accounting'),
          })
        if (_user.modules.length > 0) {
            return true
        }
        return false
    }
}
