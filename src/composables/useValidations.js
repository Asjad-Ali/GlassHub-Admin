import * as Yup from 'yup';

export default function useValidation  ()  {
    // const rules = Yup.object().shape({
        // title: Yup.string()
        //     .required('Title is required'),
        // firstName: Yup.string()
        //     .required('First Name is required'),
        // lastName: Yup.string()
        //     .required('Last name is required'),
        // dob: Yup.string()
        //     .required('Date of Birth is required')
        //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        // email: Yup.string()
        //     .required('Email is required')
        //     .email('Email is invalid'),
        // password: Yup.string()
        //     .min(6, 'Password must be at least 6 characters')
        //     .required('Password is required'),
        // confirmPassword: Yup.string()
        //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
        //     .required('Confirm Password is required'),
        // acceptTerms: Yup.string()
        //     .required('Accept Ts & Cs is required')
    // });

    const LoginRules = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().min(4).required(),
    });
    
    const helpTextRules = Yup.object().shape({
        pageName: Yup.string().required(),
        Account_id: Yup.string().required("Account type is required"),
        H_title: Yup.string().max(255)
    });

    const legalPageRules = Yup.object().shape({
        Account_id: Yup.string().required("Account type is required"),
        Page_Name: Yup.string().required(),
        legal_date: Yup.string().required()
    });

    const signupRules = Yup.object().shape({
        fullname: Yup.string().required(),
        designation: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().min(6).required(),
        confirmPassword: Yup.string().required().min(6).oneOf([Yup.ref('password'), null], 'Passwords must match') ,
        mainCategory: Yup.string().required(),
        subCategory: Yup.string().required(),
        subCategory1: Yup.string().required(),
        companyName: Yup.string().required(),
        companySize: Yup.string().required(),
        CRNumber: Yup.string().required(),
        startDate: Yup.string().required(),
        globalPresence: Yup.string().required(),
        headOfficeAddress: Yup.string().required(),
        branchOfficeAddress: Yup.string().required()
    });

    const addEvaluateRules = Yup.object().shape(
        {
        mainCategory: Yup.string().required(),
        // addPoint: Yup.string().required(),
        // requestType: Yup.string().required(),
        // ansType: Yup.string().required(),
      }
    );

    // Begin Hurrairah Malik Dated:23-05-2022
    const starRatingRules = Yup.object().shape({
        mainCategory: Yup.string().required(),
        AccountType: Yup.string().required(),
        // requestType: Yup.string().required(),
        // AddQuestion: Yup.string().required().max(1000),
    });

    const AddNewUser = Yup.object().shape({
        Name: Yup.string().required(),
        Email: Yup.string().required().email(),
        Phone: Yup.string().required(),
        Designation: Yup.string().required(),
        Password: Yup.string().min(6).required(),
        startDate: Yup.string().required(),
    });

    const TemplateRules = Yup.object().shape({
        Template_type: Yup.string().required(),
        // Account_id: Yup.string().required("Account type is required"),
        
    });
    


    
    // Close Hurrairah Malik

    return{
        LoginRules,
        signupRules,
        helpTextRules,
        legalPageRules,
        addEvaluateRules,
        starRatingRules,
        AddNewUser,
        TemplateRules,    
    }
}