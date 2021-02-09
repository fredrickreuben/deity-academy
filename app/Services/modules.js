
const User = use('App/Models/User')

class Modules {
    async has_access(user, module){
        var is_accessible = false
        await user.loadMany({
            modules: (builder) => builder.where('slug', module),
          })
        const modules = user.getRelated('modules')
        if (modules.rows.length > 0) {
            is_accessible = true
        }
        return is_accessible
    }

    async has_access_accounting(user) {
        return await this.has_access(user, "accounting")
    }

    async has_access_administrator(user) {
        return await this.has_access(user, "administration")
    }

    async has_access_payroll(user) {
        return await this.has_access(user, "payroll_management")
    }

    async has_access_staff(user) {
        return await this.has_access(user, "staff_management")
    }

    async has_access_student(user) {
        return await this.has_access(user, "student_management")
    }

    async has_access_fees(user) {
        return await this.has_access(user, "fees_management")
    }

    async has_access_transport(user) {
        return await this.has_access(user, "transport_management")
    }

    async has_access_inventory(user) {
        return await this.has_access(user, "inventory_management")
    }

    async has_access_communication(user) {
        return await this.has_access(user, "communication_management")
    }
}

module.exports = new Modules()
