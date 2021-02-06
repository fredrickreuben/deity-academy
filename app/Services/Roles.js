class Roles {
    async is_super_admin(user){
        if (user.is_super_admin) {
            return true
        }

        return false
    }

    async is_admin(user){
        if (user.is_admin) {
           return true 
        }

        return false
    }

    async is_staff(user){
        if (user.is_staff) {
           return true 
        }

        return false
    }

    async is_hod(user){
        if (user.is_hod) {
           return true 
        }

        return false
    }

    async is_director(user) {
        if (user.role === 1) {
            return true
        }

        return false
    }

    async is_bod(user) {
        if (user.role === 2) {
            return true
        }

        return false
    }

    async is_manager(user) {
        if (user.role === 3) {
            return true
        }

        return false
    }

    async is_headteacher(user) {
        if (user.role === 4) {
            return true
        }

        return false
    }

    async is_deputyheadteacher(user) {
        if (user.role === 5) {
            return true
        }

        return false
    }

    async is_accountant(user) {
        if (user.role === 6) {
            return true
        }

        return false
    }

    async is_secretary(user) {
        if (user.role === 7) {
            return true
        }

        return false
    }

    async is_seniorteacher(user) {
        if (user.role === 8) {
            return true
        }

        return false
    }

    async is_gurdian(user) {
        if (!user.is_staff) {
            return true
        }

        return false
    }
}

module.exports = new Roles()