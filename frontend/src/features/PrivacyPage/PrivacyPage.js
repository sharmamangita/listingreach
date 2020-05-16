import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import config from "config";
import { Alert } from "reactstrap";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { userActions } from "../../actions";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(userActions.getapagecontent({ page: "Privacy" }));
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.users && this.props.users.items) {
      console.log("test", this.props.users);
      if (this.props.users.items[0]) {
        var privacytitle = entities.decode(this.props.users.items[0].page);
        var privacypage = entities.decode(this.props.users.items[0].content);
      }
    }
    return (
      <div>
        <section className="intro-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="title-single-box">
                  <h1 className="title-single">Privacy Policy</h1>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <nav
                  aria-label="breadcrumb"
                  className="breadcrumb-box d-flex justify-content-lg-end"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Privacy Policy
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="col-xs-10 col-xs-offset-1">
                  <p>This document was last updated on June 11, 2018.</p>
                  <h5>1. ACKNOWLEDGEMENT AND ACCEPTANCE OF TERMS</h5>
                  <p>
                    ListingReach.com is committed to protecting your privacy.
                    This Privacy Statement sets forth our current privacy
                    practices with regard to the information we collect when you
                    or your computer interact with our website. By accessing
                    www.ListingReach.com, you acknowledge and fully understand
                    ListingReach.com’s Privacy Statement and freely consent to
                    the information collection and use practices described in
                    this Website Privacy Statement.
                  </p>
                  <h5>2. PARTICIPATING MERCHANT POLICIES </h5>
                  <p>
                    Related services and offerings with links from this website,
                    including vendor sites, have their own privacy statements
                    that can be viewed by clicking on the corresponding links
                    within each respective website. Online merchants and others
                    who participate in ListingReach.com services are encouraged
                    to participate in industry privacy initiatives and to take a
                    responsible attitude towards consumer privacy. However,
                    since we do not have direct control over the policies or
                    practices of participating merchants and other third
                    parties, we are not responsible for the privacy practices or
                    contents of those sites. We recommend and encourage that you
                    always review the privacy policies of merchants and other
                    third parties before you provide any personal information or
                    complete any transaction with such parties.
                  </p>
                  <h5>3. INFORMATION WE COLLECT AND HOW WE USE IT </h5>
                  <p>
                    ListingReach.com collects certain information from and about
                    its users three ways: directly from our Web Server logs, the
                    user, and with Cookies.
                  </p>
                  <div className="indent">
                    <h5>1. Web Server Logs.</h5>
                    <p>
                      When you visit our Website, we may track information to
                      administer the site and analyze its usage. Examples of
                      information we may track include:
                    </p>
                    <ul className="ul">
                      <li>Your Internet protocol address.</li>
                      <li>The kind of browser or computer you use.</li>
                      <li>Number of links you click within the site.</li>
                      <li>
                        State or country from which you accessed the site.
                      </li>
                      <li>Date and time of your visit. </li>
                      <li>Name of your Internet service provider. </li>
                      <li>Web page you linked to our site from. </li>
                      <li>Pages you viewed on the site. </li>
                    </ul>
                    <h5>2. Use of Cookies</h5>
                    <p>
                      ListingReach.com may use cookies to personalize or enhance
                      your user experience. A cookie is a small text file that
                      is placed on your hard disk by a Web page server. Cookies
                      cannot be used to run programs or deliver viruses to your
                      computer. Cookies are uniquely assigned to you, and can
                      only be read by a Web Server in the domain that issued the
                      cookie to you.
                    </p>
                    <p>
                      One of the primary purposes of cookies is to provide a
                      convenience feature to save you time. For example, if you
                      personalize a web page, or navigate within a site, a
                      cookie helps the site to recall your specific information
                      on subsequent visits. Hence, this simplifies the process
                      of delivering relevant content and eases site navigation
                      by providing and saving your preferences and login
                      information as well as providing personalized
                      functionality.
                    </p>
                    <p>
                      ListingReach.com reserves the right to share aggregated
                      site statistics with partner companies, but does not allow
                      other companies to place cookies on our website unless
                      there is a temporary, overriding customer value (such as
                      merging into ListingReach.com. a site that relies on
                      third-party cookies).
                    </p>
                    <p>
                      You have the ability to accept or decline cookies. Most
                      Web browsers automatically accept cookies, but you can
                      usually modify your browser setting to decline cookies. If
                      you reject cookies by changing your browser settings then
                      be aware that this may disable some of the functionality
                      on our Website.
                    </p>
                    <h5>3. Personal Information Users</h5>
                    <p>
                      Visitors to our website can register to purchase services.
                      When you register, we will request some personal
                      information such as name, address, email, telephone number
                      or facsimile number, account number and other relevant
                      information. If you are purchasing a service, we will
                      request financial information. Any financial information
                      we collect is used only to bill you for the services you
                      purchased. If you purchase by credit card, this
                      information may be forwarded to your credit card provider.
                      For other types of registrations, we will ask for the
                      relevant information. You may also be asked to disclose
                      personal information to us so that we can provide
                      assistance and information to you. For example, such data
                      may be warranted in order to provide online technical
                      support and troubleshooting.
                    </p>
                    <p>
                      We will not disclose personally identifiable information
                      we collect from you to third parties without your
                      permission except to the extent necessary including:
                    </p>
                    <ul className="ul">
                      <li>To fulfill your service requests for services.</li>
                      <li>To protect ourselves from liability,</li>
                      <li>
                        To respond to legal process or comply with law, or
                      </li>
                      <li>
                        In connection with a merger, acquisition, or liquidation
                        of the company.
                      </li>
                    </ul>
                  </div>
                  <br />
                  <h5>4. USE OF WEB BEACONS OR GIF FILES</h5>
                  <p>
                    ListingReach.com Web pages may contain electronic images
                    known as Web beacons – sometimes also called single-pixel
                    gifs – that allow ListingReach.com to count users who have
                    visited those pages and to deliver co-branded services.
                    ListingReach.com may include Web beacons in promotional
                    e-mail messages or newsletters in order to determine whether
                    messages have been opened and acted upon.
                  </p>
                  <p>
                    Some of these Web beacons may be placed by third party
                    service providers to help determine the effectiveness of our
                    advertising campaigns or email communications. These Web
                    beacons may be used by these service providers to place a
                    persistent cookie on your computer. This allows the service
                    provider to recognize your computer each time you visit
                    certain pages or emails and compile anonymous information in
                    relation to those page views, which in turn enables us and
                    our service providers to learn which advertisements and
                    emails bring you to our website and how you use the site.
                    ListingReach.com prohibits Web beacons from being used to
                    collect or access your personal information.
                  </p>
                  <h5>5. ACCESSING WEB ACCOUNT INFORMATION</h5>
                  <p>
                    We will provide you with the means to ensure that personally
                    identifiable information in your web account file is correct
                    and current. You may review this information by contacting
                    us by sending an email to our support attendant –{" "}
                    <a
                      href="mailto:info@ListingReach.com"
                      className="BlackLink"
                    >
                      info@ListingReach.com
                    </a>
                  </p>
                  <h5>6. CHANGES TO THIS STATEMENT</h5>
                  <p>
                    ListingReach.com has the discretion to occasionally update
                    this privacy statement. When we do, we will also revise the
                    “updated” date at the top of this Privacy page. We encourage
                    you to periodically review this privacy statement to stay
                    informed about how we are helping to protect the personal
                    information we collect. Your continued use of the service
                    constitutes your agreement to this privacy statement and any
                    updates.
                  </p>
                  <h5>7. CONTACTING US</h5>
                  <p>
                    If you have questions regarding our Privacy Statement, its
                    implementation, failure to adhere to this Privacy Statement
                    and/or our general practices, please contact us.{" "}
                    <a
                      href="mailto:info@ListingReach.com"
                      className="BlackLink"
                    >
                      info@ListingReach.com
                    </a>{" "}
                    or send your comments.{" "}
                    <a href="/ContactUs" className="BlackLink">
                      Contact Us
                    </a>
                  </p>
                  <h5>8. UNSUBSCRIBING</h5>
                  <p>
                    Subscribers may unsubscribe from our database at any time by
                    either clicking on the “unsubscribe” link found at the
                    bottom of every email or by clicking the “mail preferences”
                    link found at the bottom of our website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, users } = state;
  return {
    alert,
    users,
  };
}

const connectedPrivacyPage = connect(mapStateToProps)(PrivacyPage);
export { connectedPrivacyPage as PrivacyPage };
