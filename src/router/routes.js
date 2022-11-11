import Login from '@/views/admin/TheLogin.vue'
import MyProfile from '@/views/admin/ProfileLayout.vue'
import HomePage from '@/views/HomePage.vue'
import Dashboard from '@/views/SideBarMenues/DashboardPage.vue'
import Header from '@/components/layouts/TheHeader.vue'
import TermCondition from '@/views/TermCondition.vue'
const routes = [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header
    },
   
    {
      path: '/footer',
      name: 'footer',
      component: TermCondition
    },
    {
      path: '/my-profile',
      name: 'MyProfile',
      component: MyProfile
    },

    {
      path: '/',
      name: HomePage,
      component: HomePage,
      children:[
        {
          path: '/',
          component: Dashboard
        },
        {
          path: '/admin_footer',
          name: 'admin_footer',
          component: TermCondition
        },
        {
          path: '/signups',
          component: () => import('../views/SideBarMenues/SignupsList.vue'),
        },
          {
            path: '/signups/signup-setting',
            component: () => import('../components/SignupList/SignupSetting.vue')
          },
          {
            path: '/signups/new-signup',
            component: () => import('../components/SignupList/newSignup/NewSignup.vue')
          },
          {
            path: '/signups/signup-preview',
            component: () => import('../components/SignupList/SignupsPreview.vue')
          },
        {
          path: '/categories',
          component: () => import('../views/SideBarMenues/CategoriesPage.vue')
        },
        {
          path: '/admin-user',
          component: () => import('../views/SideBarMenues/AdminUsers.vue'),
        },
          {
            path: '/admin-user/add-new-user',
            component: () => import('@/components/AddNewUser.vue')
          },
          {
            path: '/compliance/edit_newuser/:id',
            name: "EditNewUser",
            component: () => import('../components/AddNewUser.vue')
          },
        {
          path: '/registrations',
          component: () => import('@/views/SideBarMenues/RegistrationsList.vue')
        },
        {
          path: '/compliance',
          component: () => import('../views/SideBarMenues/ComplianceList.vue'),
        },
          {
            path: '/compliance/add-compliance',
            component: () => import('../components/AddCompliance.vue')
          },
          {
            path: '/compliance/edit-compliance/:id',
            name: "EditcompliancePage",
            component: () => import('../components/AddCompliance.vue')
          },
        {
          path: '/audit-Request',
          component: () => import('../views/SideBarMenues/AuditRequest.vue')
        },
            {
              path: '/audit-Request/audit-Details',
              component: () => import('../components/AuditRequest/AuditsDetails.vue')
            },
            {
              path: '/audit-Request/comp-criteria',
              component: () => import('../components/AuditRequest/ComplianceCriteria.vue')
            },
        {
          path: '/projects',
          component: () => import('../views/SideBarMenues/ProjectsList.vue')
        },
        {
          path: '/organizations',
          component: () => import('../views/SideBarMenues/OrganizationsList.vue')
        },
        {
          path: '/suppliers',
          component: () => import('../views/SideBarMenues/SuppliersList.vue')
        },
        {
          path: '/freelancer',
          component: () => import('../views/SideBarMenues/FreelancerList.vue')
        },
        {
          path: '/audit-firms',
          component: () => import('../views/SideBarMenues/AuditFirms.vue')
        },
        {
          path: '/regulators',
          component: () => import('../views/SideBarMenues/RegulatorsList.vue')
        },
        {
          path: '/evaluate-supplier',
          component: () => import('../views/SideBarMenues/EvaluateSupplier.vue'),
        },
          {
            path: '/evaluate-supplier/add-evaluate-supplier',
            component: () => import('../components/EvaluateSupplier/AddEvaluateSupplier.vue')
          },
          {
            path: '/evaluate-supplier/edit-evaluate-supplier/:id',
            name: "EditEvaluateSupplier",
            component: () => import('../components/EvaluateSupplier/EditEvaluateSupplier.vue')
          },
        {
          path: '/content-page',
          component: () => import('../views/SideBarMenues/LegalPage.vue')
        },
          {
            path: '/content-page/add-content-page',
            component: () => import('@/components/LegalPages/addLegalPage.vue')
          },
          {
            path: '/content-page/edit-content-page/:id',
            name: "EditLegalPage",
            component: () => import('@/components/LegalPages/addLegalPage.vue')
          },
        {
          path: '/star-rating',
          component: () => import('../views/SideBarMenues/StarRating.vue'),
        },
          {
            path: '/star-rating/add-star-rating',
            component: () => import('../components/StarRating/AddStarRating.vue')
          },
          {
            path: '/star-rating/edit-star-rating/:id',
            name: 'EditStarRating',
            component: () => import('../components/StarRating/EditStarRating.vue')
          },
        {
          path: '/disputes',
          component: () => import('../views/SideBarMenues/DisputesList.vue')
        },
        {
          path: '/disputes/dispute-detail/:id',
          name: 'DisputeDetail',
          component: () => import('../components/Disputes/DisputeDetail.vue')
        },
        {
          path: '/help-text',
          component: () => import('../views/SideBarMenues/HelpText.vue'),
        },
          {
            path: '/help-text/add-help-text',
            component: () => import('../components/HelpText/AddHelpText.vue')
          },
        {
          path: '/help-text/edit-help-text/:id',
          name: "EditHelpText",
          component: () => import('../components/HelpText/AddHelpText.vue')
        },
        {
          path: '/template',
          component: () => import('../views/SideBarMenues/TemplateList.vue'),
        },
          {
            path: '/template/add-template',
            component: () => import('../components/AddTemplate.vue')
          },
          {
          path: '/template/edit-template/:id',
          name: "EditTemplate",
          component: () => import('../components/AddTemplate.vue')
          },
        {
          path: '/payment-methods',
          component: () => import('../views/SideBarMenues/PaymentMethods.vue'),
        },
          {
            path: '/add-payment-methods',
            component: () => import('@/components/AddPaymentMethods.vue'),
          },
          {
            path: '/add-payment-methods/:id',
            name: "EditPaymentMethods",
            component: () => import('@/components/AddPaymentMethods.vue'),
          },

      ]
    }
  ]

  export default routes