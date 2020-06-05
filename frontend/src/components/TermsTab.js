import React from "react";
import { Link } from "react-router-dom";
import { userActions } from "../actions";
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  NavLink,
} from "react-bootstrap";
import Modal from "react-bootstrap4-modal";
import { connect } from "react-redux";
import { common } from "../helpers";
import moment from "moment";

class TermsTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";
    this.state = { 
      userId: "",
      isChecked: false,
    };
    this.nexttab = this.nexttab.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }

  nexttab() {
    const { dispatch } = this.props.dispatchval.dispatch;
    dispatch(userActions.termsNext());
  }

  toggleChange(){
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    return (
      <div
        className="tab-pane fade mt-2 pl-3 pr-3"
        id="terms"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Terms & Condition</h4>
        <p>Please read and accept Terms & Conditions.</p>
        <div>
          TERMS & CONDITIONS OF USE Thank you for choosing ListingReach.com, an
          email marketing service designed for real estate brokers, owners,
          investors, tenants, managers, allied professionals and related
          services. The terms ListingReach, ListingReach.com, ListingReach and
          ListingReach.com are to be considered the same. Terms of Use Agreement
          Read This 'Terms of Use Agreement' carefully. YOU ARE SUBJECT TO ALL
          TERMS OF THIS 'TERMS OF USE AGREEMENT' for ListingReach.com. Effective
          Date: This Terms of Use Agreement was last updated on January 22,
          2016. This Terms of Use Agreement sets forth the standards of use of
          the ListingReach.com Online Service. By using the ListingReach.com
          website you (the 'Member') agree to these terms and conditions. If you
          do not agree to the terms and conditions of this agreement, you should
          immediately cease all usage of this website. We reserve the right, at
          any time, to modify, alter, or update the terms and conditions of this
          agreement without prior notice. Modifications shall become effective
          immediately upon being posted at ListingReach.com website. Your
          continued use of the Service after amendments are posted constitutes
          an acknowledgement and acceptance of the Agreement and its
          modifications. Except as provided in this paragraph, this Agreement
          may not be amended.
          <ol>
            <li>
              Description of Service
              <br />
              ListingReach.com is providing Member with email advertising
              services. ListingReach.com users may create and distribute
              electronic mail e-flyers that advertise commercial real property
              for sale, lease, exchange, auction, or investment. Recipients may
              respond by clicking embedded links to internet ListingReach.com
              websites, placing phone calls, send email, or other methods. All
              ListingReach.com users may set preferences or opt-out of receiving
              future email messages. Users must provide (1) all equipment
              necessary for their own Internet connection, including computer
              and modem and (2) provide for Member's access to the Internet, and
              (3) pay any fees relate with such connection.
            </li>
            <br />

            <li>
              Membership.
              <br />
              Registration and Membership is not required to use
              ListingReach.com. ListingReach.com may grant you limited access to
              the ListingReach.com website; however, certain portions of the
              ListingReach.com website and benefits may be available only if you
              have a membership by registering as a member by completing the
              registration process requiring that you provide current, complete,
              and accurate information as prompted by the registration process
              on the ListingReach.com website, which you represent is accurate
              and complete in all respects and that you are over age eighteen
              (18), and paying any and all amounts due on or before their due
              dates. You are responsible for keeping your Account name (email
              address) and password confidential, and are responsible for any
              and all activities that occur under your Account. You agree to
              notify ListingReach.com immediately of any unauthorized activity
              regarding your membership and any other misuse of the
              ListingReach.com website of which you are aware. ListingReach.com
              will not be responsible for any loss that you may incur as a
              result of someone else using your membership, either with or
              without your knowledge.
            </li>
            <br />

            <li>
              Software License.
              <br />
              ListingReach.com grants you a non-exclusive license to use only
              specific parts and functions of the ListingReach.com website and
              only in strict accordance with all terms of this Terms of Use
              Agreement, which license ListingReach.com may terminate at any
              time without notice if ListingReach.com believes a violation of
              this Terms of Use Agreement has transpired. Only one individual
              member may use a member's account at one time, and a single
              membership may only be used for the benefit of one (1) individual
              member who is the registered user for that membership.
            </li>
            <br />

            <li>
              Disclaimer of Warranties.
              <br />
              The site is provided by ListingReach.com on an 'as is' and on an
              'as available' basis. To the fullest extent permitted by
              applicable law, ListingReach.com makes no representations or
              warranties of any kind, express or implied, regarding the use or
              the results of this web site in terms of its correctness,
              accuracy, reliability, or otherwise. ListingReach.com shall have
              no liability for any interruptions in the use of this Website.
              ListingReach.com disclaims all warranties with regard to the
              information provided, including the implied warranties of
              merchantability and fitness for a particular purpose, and
              non-infringement. Some jurisdictions do not allow the exclusion of
              implied warranties; therefore the above-referenced exclusion is
              inapplicable.
            </li>
            <br />

            <li>
              Limitation of Liability
              <br />
              ListingReach.com SHALL NOT be liable for any damages whatsoever,
              and in particular ListingReach.com shall not be liable for any
              special, indirect, consequential, or incidental damages, or
              damages for lost profits, loss of revenue, or loss of use, arising
              out of or related to this web site or the information contained in
              it, or any email campaign sent by ListingReach.com whether such
              damages arise in contract, negligence, tort, under statute, in
              equity, at law, or otherwise, even if ListingReach.com has been
              advised of the possibility of such damages. SOME JURISDICTIONS DO
              NOT ALLOW FOR THE LIMITATION OR EXCLUSION OF LIABILITY FOR
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, THEREFORE SOME OF THE ABOVE
              LIMITATIONS IS INAPPLICABLE.
            </li>
            <br />

            <li>
              No Unlawful or Prohibited Use Including Information Advertised or
              emailed
              <br />
              As a condition of your use of the ListingReach.com website, you
              warrant and guarantee that you will not use the ListingReach.com
              website for any purpose that is unlawful or prohibited by this
              Terms of Use Agreement.
              <br />
              1. You agree that any and all information you, or anyone on your
              behalf, advertises through the ListingReach.com website shall at
              all times be:
              <br />
              <br />
              (i) Accurate in all respects to your knowledge and belief at the
              time of advertising;
              <br />
              <br />
              (ii) Authorized in writing to be advertised through the
              ListingReach.com website by all owners of real property and/or
              businesses
              <br />
              <br />
              (iii) Lawfully placed in the ListingReach.com website and in any
              of ListingReach.com hardware and software.
              <br />
              <br />
              (iv) Accessed, used, and distributed strictly in accordance with
              all terms of this Terms of Use Agreement
              <br />
              <br />
              (v) Formatted and within the type, size and other limits as
              described in the ListingReach.com website, which ListingReach.com
              reserves the right to modify, including without limitation the
              number of days that data will remain within the ListingReach.com
              website and the volume of data which you may store on the
              ListingReach.com website at any one time.
              <br />
              2. All information you place on the ListingReach.com website is
              accessible by ListingReach.com at all times, and may be revised by
              ListingReach.com conform to all the ListingReach.com website
              requirements, although ListingReach.com is under no obligation to
              reformat any data and shall not be liable to you or any other
              person for any data or revisions thereto
              <br />
              3. You are responsible for any and all activities that transpire
              under your membership, and must log off and exit from your
              membership account at the end of each session of use. You shall
              send ListingReach.com notice immediately upon you being aware or
              suspicious of any unauthorized use of the ListingReach.com website
              by any person.
              <br />
              4. You hereby grant ListingReach.com and its assigns a
              non-exclusive, unrestricted, perpetual, royalty free license to
              display, publish, and otherwise use any and all property data and
              information you, or any person designated by you, advertises
              through the ListingReach.com website.
              <br />
              5. If ListingReach.com reasonably suspect that any material
              information supplied is untrue, inaccurate, not current, or
              incomplete, ListingReach.com has the right to suspend or terminate
              your access to the ListingReach.com website and all data thereon,
              and may restore access to the ListingReach.com website and any
              data thereon, in ListingReach.com's sole and absolute discretion,
              after any and all defaults have been cured to ListingReach.com's
              satisfaction.
              <br />
              6. You hereby authorize the ListingReach.com website and
              ListingReach.com to place cookies and other files on your
              computer's hard drive or other storage medium to assist the
              ListingReach.com website in limiting access to only authorized
              users and recording authentication information for the duration,
              activities, and content of each session on the ListingReach.com
              website.
              <br />
              7. In accordance with and within the privacy and other limitations
              then set forth in the ListingReach.com website, you authorize
              ListingReach.com full access to any information regarding you,
              your Account, any information you place on the ListingReach.com
              website, all cookies and other information, the use of any and all
              data on the ListingReach.com website. Notwithstanding the above,
              ListingReach.com will not disclose any information regarding any
              user or the use of any and all data in the ListingReach.com
              website without your prior permission except to its affiliates,
              licensors or sponsors, or in accordance with the ListingReach.com
              website, this Terms of Use Agreement, or as may be required by law
              or lawful process
              <br />
              8. You will abide by all applicable local, state, national, and
              foreign laws, treaties, and regulations in connection with the
              ListingReach.com website and agree not to use the ListingReach.com
              website or any feature, aspect, or data in, a part of, or from the
              ListingReach.com website to:
              <br />
              <br />
              (i) Post or send any unsolicited or unauthorized advertising,
              promotions, junk mail, spam, chain letters, pyramid schemes, or
              any other form of duplicative or unsolicited messages, whether
              commercial or otherwise that do not directly relate to commercial
              real estate and/or related services
              <br />
              <br />
              (ii) Harvest, collect, gather, or assemble information or data
              regarding other users, including email addresses, without their
              consent
              <br />
              <br />
              (iii) Transmit through or post on the ListingReach.com website any
              unlawful, harassing, libelous, abusive, torturous, defamatory,
              threatening, harmful, and invasive to another's privacy, vulgar,
              obscene, pornographic, or otherwise objectionable material of any
              kind or nature, or which is harmful to minors in any way
              <br />
              <br />
              (iv) Transmit any material which may infringe upon any property or
              upon any rights of any person including without limitation
              trademark, copyright, or right of publication in any form or
              format.
              <br />
              <br />
              (v) Transmit any material that you are aware contains a software
              virus or viruses, or other harmful or objectionable computer code,
              files, program, routine such as Trojan horses, worms, time bombs,
              cancel bots, or pop-ups. (See Paragraph 19)
              <br />
              <br />
              (vi) Interfere with or disrupt servers, networks, hardware,
              software, or users connected to, using, or a part of the
              ListingReach.com website, or violate the licenses, policies,
              procedures, or regulations of such.
              <br />
              <br />
              (vii) Attempt to gain unauthorized access to the ListingReach.com
              website, other accounts, computer systems, networks, or users
              connected to or using the ListingReach.com website, through
              password mining or any other means.
              <br />
              <br />
              (viii) Harass or interfere with another user's use or enjoyment of
              the ListingReach.com website and any of that or other user's data
              on the ListingReach.com website.
            </li>
            <li>
              Indemnification
              <br />
              You are responsible for any and all data which you or your
              designee advertises through the ListingReach.com website. Member
              agrees to indemnify and hold ListingReach.com, its parents,
              subsidiaries, affiliates, officers and employees, harmless from
              any claim or demand, including reasonable attorneys' fees and
              costs, made by any third party due to or arising out of Member's
              use of the Service, the violation of this Agreement, or
              infringement by Member, or other user of the Service using
              Member's computer, of any intellectual property or any other right
              of any person or entity.
            </li>
            <br />

            <li>
              Modifications and Interruption to Service
              <br />
              ListingReach.com reserves the right to modify or discontinue the
              Service with or without notice to the Member. ListingReach.com
              shall not be liable to Member or any third party should
              ListingReach.com exercise its right to modify or discontinue the
              Service. Member acknowledges and accepts that ListingReach.com
              does not guarantee continuous, uninterrupted or secure access to
              our website and operation of our website may be interfered with or
              adversely affected by numerous factors or circumstances outside of
              our control.
            </li>
            <br />

            <li>
              Technical Support and Training
              <br />
              ListingReach.com shall provide technical support at its sole
              discretion for any difficulties you may have accessing the
              ListingReach.com website or any of its features. Technical support
              will not include any aspect of your computer's hardware, software,
              configurations, means of gaining access to the internet, ability
              to browse the internet, or ability to access any facet or portion
              of the ListingReach.com website.
            </li>
            <br />

            <li>
              Change Requests, Cancellations, Product Disputes, and Resolution.
              (i) The ListingReach.com website member initiating an order is
              solely responsible for the accuracy of the information contained
              therein. Members are 100% responsible for proofing and reviewing
              their orders at all stages during the process.
              <br />
              <br />
              (ii) Electronic proofs are provided in advance of member
              distribution via browser and email. It is the initiating member's
              responsibility to review these proofs for accuracy prior to
              distribution. By accepting these terms and conditions, you are
              notifying ListingReach.com that you have completely proofed your
              creative work including but not limited to clicking on "related
              links", reading your content, checking for accuracy on address,
              price, details and personal contact information.
              <br />
              <br />
              (iii) For all orders, the automated order fulfillment process
              places the members order into queue for review by ListingReach.com
              before sending but not before the member or members designee
              approves their proof and submits payment. ListingReach.com does
              not accept change requests once member initiating the order has
              completed the order process. Changes cannot be made once an order
              is queued for distribution. ListingReachs are mailed out on a
              first come first served basis. Though the member is able to pick a
              desired date of emailing, no guarantees of date or time of day are
              expressed or implied.
              <br />
              <br />
              (iv) ListingReach.com does not issue refunds for the eblast
              services, except in the following case: If we find the content of
              a particular blast is not suitable for mailing, a full refund of
              the fee paid will be given.
              <br />
              <br />
              (v) ListingReach.com processes payments via the credit or debit
              cards provided by the initiating member at the time that the order
              is placed, prior to distribution.
              <br />
              <br />
              (vi) ListingReach.com does not guarantee the level of response for
              messages sent throughout its network. The unique nature of real
              property is such that the interest may vary dramatically from one
              property marketing campaign to another as well as market pricing,
              quality of offerings, market demand and the economy.
              ListingReach.com does not offer refunds if recipient response
              rates do not match the expectations of the sender. Past
              performance may not indicate future results.
              <br />
              <br />
              (vii) Customers are solely responsible for carefully reviewing all
              messages prior to distribution, including customer proofs.
              ListingReach.com does not issue refunds or credits for customer
              errors, including but not limited to typographical errors,
              incomplete text,incorrect HTML code, low resolution or incorrect
              graphics, non-working or broken URL links, missing content or
              improperly selected distribution areas.
              <br />
              <br />
              (viii) In the event that ListingReach.com makes an error while
              fulfilling an order, it will resend the order at no charge.
              ListingReach.com may also issue credits for future purchases. No
              refunds will be given. Additional questions related to change
              requests, cancellations, product disputes, and resolution should
              be directed to ListingReach.com Customer Support staff at
              info@ListingReach.net.
            </li>
            <br />

            <li>
              Force Majeure (Higher Forces and/or Acts of God)
              <br />
              The ListingReach.com website contains functionalities and services
              that allow sending, delivering or receiving information between
              users, which may be relayed or carried through ListingReach.com,
              public, third parties' or other networks, systems, servers,
              ListingReach.com websites or applications (examples being:
              telephone and cellular networks, email servers etc. known here
              forward as "Third Parties' Network"). The Third Parties' Networks
              are not controlled by ListingReach.com in any way and
              ListingReach.com will not be held responsible for the performance,
              availability, functionality, quality or reliability of any of the
              Third Parties' Networks or the information sent, delivered,
              relayed, carried or received through the Third Parties' Networks.
              Notwithstanding anything herein, ListingReach.com does not warrant
              or guarantee that the information sent, relayed, carried or
              delivered through these Third Parties' Networks will reach its
              destination or its correct address or recipient or that the
              details of the recipient or sender are correct or accurate.
              ListingReach.com will not be liable for, and will be excused from,
              any failure to deliver or perform, or for any delay in delivery or
              performance, due to causes beyond its reasonable control, after
              exercising its best commercially reasonable efforts to remedy any
              such failure or delay, including without limitation any government
              actions, fire, work stoppages, civil disturbances, interruptions
              of power or communications to ListingReach.com or any facilities
              used by or for ListingReach.com, failure of internet, hosting,
              telecommunications, or other services to ListingReach.com or
              facilities used by or for ListingReach.com, natural disasters,
              acts of God, or acts of terrorism or war.
            </li>
            <br />

            <li>
              Third-Party Sites
              <br />
              Our website may include links to other sites on the Internet that
              are owned and operated by online merchants and other third
              parties. You acknowledge that we are not responsible for the
              availability of, or the content located on or through, any
              third-party site. You should contact the site administrator or
              webmaster for those third-party sites if you have any concerns
              regarding such links or the content located on such sites. Your
              use of those third-party sites is subject to the terms of use and
              privacy policies of each site, and we are not responsible therein.
              We encourage all Members to review said privacy policies of
              third-parties' sites.
            </li>
            <br />

            <li>
              {" "}
              Disclaimer Regarding Accuracy of Vendor Information
              <br />
              Product specifications and other information have either been
              provided by the Vendors or collected from publicly available
              sources. While ListingReach.com makes every effort to ensure that
              the information on this website is accurate, we can make no
              representations or warranties as to the accuracy or reliability of
              any information provided on this website.
              <br />
              <br />
              ListingReach.com makes no warranties or representations whatsoever
              with regard to any product provided or offered by any Vendor, and
              you acknowledge that any reliance on representations and
              warranties provided by any Vendor shall be at your own risk.
            </li>
            <br />

            <li>
              Governing Jurisdiction of the Courts Florida
              <br />
              Our website is operated and provided in the State of Florida. As
              such, we are subject to the laws of the State Florida, and such
              laws will govern this Terms of Use, without giving effect to any
              choice of law rules. We make no representation that our website or
              other services are appropriate, legal or available for use in
              other locations. Accordingly, if you choose to access our site you
              agree to do so subject to the internal laws of the State Florida.
            </li>
            <br />

            <li>
              Compliance with Laws.
              <br />
              Member assumes all knowledge of applicable law and is responsible
              for compliance with any such laws. Member may not use the Service
              in any way that violates applicable state, federal, or
              international laws, regulations or other government requirements.
              Member further agrees not to transmit any material that encourages
              conduct that could constitute a criminal offense, give rise to
              civil liability or otherwise violate any applicable local, state,
              national, or international law or regulation.
            </li>
            <br />

            <li>
              Severability
              <br />
              If any part of this Terms of Use Agreement is found void and
              unenforceable, it will not affect the validity of the balance of
              the Terms of Use Agreement, which shall remain valid and
              enforceable according to its terms. If any part of this Terms of
              Use Agreement is determined to be invalid or unenforceable
              pursuant to applicable law including, but not limited to, the
              warranty disclaimers and liability limitations set forth herein,
              then the invalid or unenforceable provision will be deemed
              superseded by a valid, enforceable provision that most closely
              matches the intent of the original provision and the remainder of
              the Terms of Use Agreement shall continue in effect. Use of the
              ListingReach.com website is unauthorized in any jurisdiction that
              does not give effect to all provisions of these terms and
              conditions, including, without limitation, this paragraph.
            </li>
            <br />

            <li>
              Copyright and Trademark Information
              <br />
              All content included or available on this site, including site
              design, text, graphics, interfaces, and the selection and
              arrangements thereof is property of ListingReach.com., with all
              rights reserved, or is the property of ListingReach.com and/or
              third parties protected by intellectual property rights. Any use
              of materials on the website, including reproduction for purposes
              other than those noted above, modification, distribution, or
              replication, any form of data extraction or data mining, or other
              commercial exploitation of any kind, without prior written
              permission of an authorized officer of ListingReach.com is
              strictly prohibited. Members agree that they will not use any
              robot, spider, or other automatic device, or manual process to
              monitor or copy our web pages or the content contained therein
              without prior written permission of an authorized officer of
              ListingReach.com.
              <br />
              <br />
              ListingReach.com' is a proprietary mark of ListingReach.com.
              ListingReach.com's trademarks may not be used in connection with
              any product or service that is not provided by ListingReach.com,
              in any manner that is likely to cause confusion among customers,
              or in any manner that disparages or discredits ListingReach.com.
              <br />
              <br />
              All other trademarks displayed on ListingReach.com's website are
              the trademarks of their respective owners, and constitute neither
              an endorsement nor a recommendation of those Vendors. In addition,
              such use of trademarks or links to the web sites of Vendors is not
              intended to imply, directly or indirectly, that those Vendors
              endorse or have any affiliation with ListingReach.com.
            </li>

            <li>
              {" "}
              Notification of Claimed Copyright Infringement Pursuant to Section
              512(c) of the Copyright Revision Act, as enacted through the
              Digital Millennium Copyright Act, ListingReach.com designates the
              following individual as its agent for receipt of notifications of
              claimed copyright infringement.
              <br />
              By Mail: 6900 Daniels Parkway, Suite 29 #180 Fort Myers, Florida
              33912
              <br />
              By Telephone: 800-418-4452
              <br />
              By Email: info@ListingReach.net
            </li>
            <br />

            <li>
              Botnets
              <br />
              ListingReach.com retains the right, at our sole discretion, to
              terminate any accounts involved with botnets and related
              activities. If any hostnames are used as command and control
              points for botnets, ListingReach.com reserves the right to direct
              the involved hostnames to a honeypot, loopback address, logging
              facility, or any other destination at our discretion.
            </li>
            <br />

            <li>
              Other Terms
              <br />
              If any provision of this Terms of Use Agreement shall be unlawful,
              void or unenforceable for any reason, the other provisions (and
              any partially-enforceable provision) shall not be affected thereby
              and shall remain valid and enforceable to the maximum possible
              extent. You agree that this Terms of Use Agreement and any other
              agreements referenced herein may be assigned by ListingReach.com,
              in our sole discretion, to a third party in the event of a merger
              or acquisition. This Terms of Use Agreement shall apply in
              addition to, and shall not be superseded by, any other written
              agreement between us in relation to your participation as a
              Member. Member agrees that by accepting this Terms of Use
              Agreement, Member is consenting to the use and disclosure of their
              personally identifiable information and other practices described
              in our Privacy Policy Statement.
              <br />
              You agree that no joint venture, partnership, employment, or
              agency relationship exists between you and ListingReach.com as a
              result of this Terms of User Agreement or your use of the
              ListingReach.com website.
              <br />
              Prior to placing an order or using any ListingReach.com product
              and/or service, you agree to ListingReach.com's stated Privacy
              Policy (found at www.ListingReach.com) and this Terms of Use
              Agreement.
            </li>
          </ol>
        </div>
        <label className="check">
          I Accept the Terms & Conditions
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.toggleChange}
          />
          <span className="checkmark"></span>
        </label>
        {this.state.isChecked ? (
          <div className="col-md-12 mt-4">
            <a
              href="javascript:void(0)"
              className="btn btn-primary"
              onClick={this.nexttab}
            >
              Save
            </a>
            <a
              href="javascript:void(0)"
              className="btn btn-primary pull-right"
              onClick={this.nexttab}
            >
              Next
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TermsTab;
