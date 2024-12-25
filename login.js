export default class loginPage {
    static textLogin(){
        return cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]');
    }
    static inputUsername(){
        return cy.get('[name="username"]');
    }
    static inputPassword(){
        return cy.get('[name="password"]');
    }
    static buttonLogin(){
        return cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]')
    }
    static menuDashboard(){
        return cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')
    }
    static invalidcredentials(){
        return cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]')
    }
    static required(){
       return cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]')
    }
    static forgotyourPassword(){
        return cy.contains('Forgot your password?')
    }
    static url(){
        return cy.url()
    }
    static h6 (){
        return  cy.get('h6')
    }
    static buttonforgotPassword (){
        return cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]')
    }
    static messages(){
        return cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]')
    }
}