 <?php
require_once 'generic.functions.web.include.php';

class <%= namespace %>_IndexController extends Ifbyphone_Controller_Action_AssetLoader
{
    private $curlClient = null;

    protected $cache_version = 1401829194285;


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

        // If this user doesn't have access to this application, then redirect them.
        // if (!$GLOBALS['Ibp_User']->getAccountItemAccess(<MENU ITEM ID GOES HERE>))
        // {
        //     header ("Location: home.php", true);
        //     exit();
        // }

        // Get the account ID
        $acctId = $GLOBALS['Ibp_User']->getAccountID();
        $this->view->acctId = $acctId;

        // add the CSRF token to the view for use in URL redirects
        $this->view->csrfToken = Zend_Registry::get('ibpSession')->legacy['csrf_token'];
    }

    private function redirectToLogout()
    {
        $this->_redirector = $this->_helper->getHelper('Redirector');
        $this->_redirector->setCode(302)
                          ->setExit(true)
                          ->setGotoUrl("../logout.php");
    }
}
