<?php
require_once 'generic.functions.web.include.php';

class <%= namespace %>_IndexController extends Zend_Controller_Action
{
    private $curlClient = null;

    public function init()
    {
        $this->_helper->getHelper('AssetLoader')
                      ->assignAssets();
    }

    public function indexAction()
    {
        $session = new Zend_Session_Namespace();
        $this->view->session = $session;

        // send user to login page if no session is detected
        if(!is_object($session->legacy['Ibp_User']) || $session->legacy['Ibp_User']->getAccountID() == 0){
            $this->redirectToLogout();
            ibp_trace(Zend_Log::DEBUG, 'no session', __FILE__, __LINE__);
            return;
        }

// UNCOMMENT TO LIMIT ACCOUNT ACCESS
        // If this user doesn't have access to this application, then redirect them.
        // if (!$GLOBALS['Ibp_User']->getAccountItemAccess(<MENU ITEM ID GOES HERE>))
        // {
        //     header ("Location: /home.php", true);
        //     exit();
        // }

        // Get the account ID
        $acctId = $GLOBALS['Ibp_User']->getAccountID();

        // Get the users public key (used for the snippet)
        $publicKey = $GLOBALS['Ibp_User']->getAccountKeys('public_key');

        $organicConfig = $this->getInvokeArg('bootstrap')->getOption('organic');
        $apiUrlBase = "/{$organicConfig['version']}/";

        // fetch the kiss metrics API key for the javascript library
        $kissMetricsConfig = $this->getInvokeArg('bootstrap')->getOption('kissmetrics');
        $this->view->kissMetricsApiKey = $kissMetricsConfig['apiKey'];
        $this->view->kissMetricsIdentity = $session->legacy['Ibp_User']->getAccountID();

        // add the CSRF token to the view for use in URL redirects
        $this->view->csrfToken = Zend_Registry::get('ibpSession')->legacy['csrf_token'];

        // determine if this application environment should have debug information displayed by default
        $debugEnvironments = array("local", "dev");
        $this->view->activateDebug = in_array(APPLICATION_ENV, $debugEnvironments);

        // configure the displayed JS snippet for the appropriate environment
        $this->view->environment = APPLICATION_ENV;

        // Get CST number for this account
        $accountMapper = new Ifbyphone_Model_Mapper_Account();
        $accountInfo   = $accountMapper->getAccountById(new Ifbyphone_Model_Account(array('acct_id' => $acctId)));

        $themeMapper   = new Ifbyphone_Model_Mapper_Ref_Theme();
        $defaultTheme  = $themeMapper->getThemeData('default');
        $accountTheme  = $themeMapper->getThemeData($accountInfo->theme);

        $supportNumber = $accountTheme->customer_service_phone_number
                            ? $accountTheme->customer_service_phone_number
                            : $defaultTheme->customer_service_phone_number;

        // bootstrap app data as json
        $appData = array(
            "acctId" => $acctId,
            "apiUrlBase" => $apiUrlBase,
            "environment" => APPLICATION_ENV,
            "publicKey" => $publicKey,
            "supportNumber" => $supportNumber
        );

        $this->view->appData = json_encode($appData);
    }

    private function redirectToLogout()
    {
        $this->_redirector = $this->_helper->getHelper('Redirector');
        $this->_redirector->setCode(302)
                          ->setExit(true)
                          ->setGotoUrl("../logout.php");
    }
}
