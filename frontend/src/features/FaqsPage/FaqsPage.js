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
class FaqsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    //this.props.dispatch(userActions.getapagecontent({page:'Privacy'}));
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
                  <h1 className="title-single">FAQs</h1>
                  <span className="color-text-a"></span>
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
                      FAQs
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
              <div className="col-sm-12 section-t2">
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-xs-10">
                      <div className="list-group noIndent">
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How many agents are in the database?
                          </span>
                        </span>
                        <span className="ng-scope  mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              We have over 1 million brokers and agents in the
                              ListingReach Homes database. Names are broken down
                              by real estate association membership.{" "}
                              <u>
                                <strong>
                                  <a
                                    href="http://www.ListingReach.com/Databases"
                                    target="_blank"
                                  >
                                    <span style={{ color: "#0000ff" }}>
                                      Click Here
                                    </span>
                                  </a>
                                </strong>
                              </u>{" "}
                              to see a break down by real estate association in
                              each state. Or, view the "Databases" link found at
                              the bottom of our Home page.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Who Receives ListingReachs?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
						  <span>
                          <span className="ng-binding">
                            Our list is primarily a real estate broker/agent
                            database and is broken down by real estate board
                            affiliation. Anyone however can opt into our
                            database who would like to receive residential
                            listing alerts.{" "}
                          </span>
						  </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How much does it cost to send a ListingReach?
                          </span>
                        </span>
                        <span className="ng-scope  mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              We have 2 types of ListingReach broadcasts:
                              residential real estate for sale and real estate
                              related services such as lending for example.
                              Listings for sale cost $19.95 for the first real
                              estate agent list selected and $15 more for each
                              aspanitional real estate agent list selected. Real
                              estate related services cost $29.95 for the first
                              real estate agent list selected and $15 more for
                              each aspanitional real estate agent list selected.
                            </span>

                            <span>
                              We also have bulk purchases available.&nbsp;
                              Receive a 10% discount if you prepay for 10 blasts
                              in advance or receive a 20% discount if you prepay
                              for 20 blasts in advance.&nbsp; Please contact our
                              support department for more details and to
                              purchase.
                            </span>

                            <span>*Pricing is subject to change without notice.</span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Will I be reaching EVERY AGENT in my market?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              No, you will not.&nbsp; Some do not wish to
                              receive this type of marketing and have utilized
                              the unsubscribe link found at the bottom of every
                              email we send. We do supply you with the estimated
                              reach prior to making payment. We also have
                              database counts on our database page which is
                              located at the bottom of every page of our site.{" "}
                              <span style={{ fontSize: "16px" }}>
                                <span style={{ color: "#000000" }}>
                                  <strong>
                                    Please scroll down and read the sections
                                    below regarding unsubscribed agents as well
                                    as the section on open rates.
                                  </strong>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Is there a charge to create an account at
                            ListingReach.com and work on the templates?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            No, there are no set up costs, subscriptions or
                            membership costs. There are no contracts and no
                            monthly minimums. You only pay for a ListingReach
                            when you send a ListingReach.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How much does it cost to receive your ListingReach
                            alerts?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            Free. It is always free to receive our alerts.
                          </span>
                        </span>
                        <span className="ng-scope mb-3" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Where do you get your email list from?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            Our list compilation system is proprietary
                            information and very reliable.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Do you have templates?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            We have several templates to choose from. Feel free
                            to use our fill in the blank style templates or
                            upload your own flyer. You can even use your own
                            html code or create your own html flyer from
                            scratch.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How long after I confirm the order do you send out
                            the blast?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            Once you have placed your order it will go into
                            queue for approval by our compliance department.
                            After approval, it will be emailed on the day you
                            selected and will be deployed in the order received
                            for that date. Orders are sent on a first come first
                            blasted basis. Please keep in mind that we review
                            all orders before they are sent and that our office
                            hours are Mon-Fri 9-5pm eastern time. If the
                            calendar does not allow you to select a specific day
                            then you must select the next available day.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Do I get to see it first before you send it out?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            Yes, you can preview the blast online or send a copy
                            to any email aspanress before confirming your order.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How many times will my ListingReach be sent out?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A: <span className="ng-binding">One time.</span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            What if I have a real estate related 'Service' I
                            wanted to market? Can I do that?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Yes as long as the service is 100% directly
                              related to business of real estate brokerage and
                              as long as you do not email the same database more
                              than one time every 14 days.
                            </span>

                            <span>
                              ( we reserve the right to reject any flyer we deem
                              inappropriate)
                            </span>

                            <span>Recruitment flyers are no longer permitted.</span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            What is a "Real Estate Related Service".
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            A real estate related service is an available
                            service provided to real estate brokers, agents and
                            the industry. These are services that are directly
                            related to the sale and leasing of real estate.
                            Examples include but are not limited to mortgage
                            lending, real estate coaching and education, title
                            companies and home inspection. Recruitment flyers
                            are no longer permitted.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Do you already have the brokers' emails that a blast
                            would go to or do we provide that?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              You will be mailing to our extensive list of real
                              estate brokers and agents.&nbsp; You can review
                              our database and counts here:{" "}
                              <strong>
                                <u>
                                  <a
                                    href="https://ListingReach.com/databases"
                                    target="_blank"
                                  >
                                    <span style={{ color: "#0000ff" }}>
                                      www.ListingReach.com/Databases
                                    </span>
                                  </a>
                                </u>
                              </strong>
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I pick which time of day my blast will be sent?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            You can choose the day you would like your
                            ListingReach to go out on but not the time of day.
                            ListingReachs are sent out on a first come first
                            served basis. We are unable to control what time of
                            day your blast will be sent.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Do you have a "save" feature? Can we save our work
                            and come back later?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Yes however our system does this for you
                              AUTOMATICALLY. Every time you complete a step and
                              click NEXT STEP, your work is saved.&nbsp; If you
                              need to leave and come back later, you will find
                              all of your saved work under the MY SAVED BLASTS
                              icon in your account. Simply click COMPLETE BLAST
                              ORDER to pull up your saved work.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I work on 2 templates at the same time? Can I
                            have 2 people sign into my account and work on 2
                            different templates at the same time?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            No, you can only work on one template at a time per
                            account.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Do you provide statistics on the ListingReachs I
                            send?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A: <span className="ng-binding">Yes</span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I have a commercial property to email. Doesn't
                            ListingReach have a commercial platform too?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Yes, you can send commercial real estate blasts
                              and commercial real estate related service blasts
                              at{" "}
                              <strong>
                                <u>
                                  <a
                                    href="http://www.ListingReach.com"
                                    target="_blank"
                                  >
                                    <span style={{ color: "#0000ff" }}>
                                      www.ListingReach.com
                                    </span>
                                  </a>
                                </u>
                              </strong>
                              .
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I blast out commercial real estate for sale or
                            for lease?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              ListingReach.com was designed for residential real
                              estate. Our commercial real estate platform is
                              called{" "}
                              <a
                                href="http://www.ListingReach.com"
                                target="_blank"
                              >
                                <span style={{ color: "#0000ff" }}>
                                  <u>
                                    <strong>ListingReach.com</strong>
                                  </u>
                                </span>
                                .
                              </a>{" "}
                              You can advertise commercial properties for sale
                              and for lease and blast out to over 90,000
                              commercial professionals nationwide. Please see
                              our link to ListingReach.com in the upper right
                              hand corner of the page or{" "}
                              <u>
                                <strong>
                                  <a
                                    href="http://www.ListingReach.com"
                                    target="_blank"
                                  >
                                    <span style={{ color: "#0000ff" }}>
                                      Click HERE.
                                    </span>
                                  </a>
                                </strong>
                              </u>
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Are there any tutorials or training videos?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              ABSOLUTELY. Our tutorials link is displayed in the
                              navigation bar at the top of the page and is also
                              available from within your control panel, or{" "}
                              <u>
                                <strong>
                                  <a
                                    href="https://ListingReach.com/tutorials"
                                    target="_blank"
                                  >
                                    <span style={{ color: "#0000ff" }}>
                                      CLICK HERE
                                    </span>
                                  </a>
                                </strong>
                              </u>{" "}
                              to view our tutorial pages.&nbsp;&nbsp; In
                              aspanition to our short "full length" tutorial
                              videos, we also have available short, 30 second
                              snippets of tutorial video at every step as shown
                              below. This way you can review the section of
                              tutorial video on the step if you need to.&nbsp;
                              The snippet of tutorial is found under the
                              instruction button at the top of the left menu bar
                              at every step.&nbsp; See image below.
                            </span>

                            <span>&nbsp;</span>

                            <span>&nbsp;</span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I sent a blast and I received it twice. Did it go
                            out twice?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            No, your blast was sent out only one time. You
                            received a live copy because you were in the
                            database that you blasted. Also, as the "sender",
                            you also received a "draft" copy. If you had
                            selected a database to blast that you were not
                            subscribed, then you only would have received the
                            "draft" copy.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            The view online, reply to sender and forward to
                            associate buttons do not work in my "DRAFT" copy.
                            Why?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            These links that are programmed by our template
                            become live when they are actually blasted. Any
                            links that you program in the body of the blast will
                            work from within the "DRAFT" copy.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How do I avoid the junk folder?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              We make every effort to insure that your mail is
                              delivered into the "in box". However, you as "The
                              User" are ultimately responsible for the content
                              you create which has a direct reflection on your
                              results. To insure the best response you can have
                              please follow this list of COMMON MISTAKES TO
                              AVOID:
                            </span>

                            <span>
                              These are the most common mistakes we see new
                              email marketers make, which result in accidental
                              spam filtering.
                            </span>

                            <ul>
                              <li>
                                Using spammy phrases, like "Click here!" or
                                "Once in a lifetime opportunity!"
                              </li>
                              <li>Going crazy with exclamation points!!!!!!</li>
                              <li>
                                USING ALL CAPS, WHICH IS LIKE YELLING IN EMAIL
                                (especially in the subject)
                              </li>
                              <li>Coloring their fonts bright red, or green</li>
                              <li>
                                Coding sloppy HTML (usually from converting a
                                Microsoft Word file to HTML)
                              </li>
                              <li>
                                Creating an HTML email that's nothing but one
                                big image, with little or no text (since spam
                                filters can't read images, they assume you're a
                                spammer that's trying to trick 'em).
                              </li>
                              <li>
                                Using the word "Test" in the subject line
                                (agencies run into this all the time, when
                                sending drafts to clients for approval)
                              </li>
                              <li>
                                Sending a test to multiple recipients within the
                                same company (that company's email firewall can
                                only assume it's a spam attack)
                              </li>
                              <li>
                                Designing HTML email in Microsoft Word, and
                                exporting the code to HTML (that code is sloppy,
                                and spam filters hate it)
                              </li>
                            </ul>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            What are your open rates? How many people will read
                            me email blast?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              You've probably heard of the 80/20 rule. It's a
                              contemporary theory that states "20 percent of an
                              action will result in 80 percent of reaction". It
                              is said that 20% of Realtors make 80% of the sales
                              which tells us that 20% are active agents. Since
                              our open rates range between 10-20% this seems to
                              be an accurate summation.&nbsp; Here are some
                              points to remember:
                            </span>

                            <ul>
                              <li>
                                Your open rate is directly related to the "email
                                subject line" you enter into the program. Make
                                sure its relevant, snappy and not typed in all
                                capital letters.
                              </li>
                              <li>
                                Open rates are triggered by an action taking
                                place on the email received such as downloading
                                the pictures or clicking on a link. If the email
                                is read from an mobile device such as a phone or
                                tablet and then deleted without making such an
                                action due to non interest, this will not
                                trigger the "open" indicator. The read rate is
                                typically much higher than the open rate
                                however, to date, there is no way of tracking
                                the read rate without triggering the open.
                              </li>
                            </ul>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I send out a recruitment flyer through your
                            service?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            No. Recruitment flyers are no longer permitted.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Why don't pictures show up automatically?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Due to internet security regulations as well as
                              potential memory storage limitations on individual
                              devises such as phones, hosted images that arrive
                              in emails do not show up automatically unless the
                              recipient has set their email program to download
                              images automatically. Clicking the "download
                              images" command provided by your email service
                              provider within the email received will display
                              the pictures.
                            </span>

                            <span style={{ marginleft: "40px" }}>
                              <strong>
                                <u>
                                  <a href="https://knowledgebase.constantcontact.com/articles/KnowledgeBase/5554-images-not-displaying-in-an-email-client?lang=en_US#iOS">
                                    <span style={{ color: "#0000ff" }}>
                                      • Click Here
                                    </span>
                                  </a>
                                </u>
                                <span style={{ color: "#0000ff" }}> </span>
                              </strong>
                              to learn more about this from a terrific 3rd party
                              reference from the great people over at{" "}
                              <u>
                                <strong>
                                  <a href="https://knowledgebase.constantcontact.com/articles/KnowledgeBase/5554-images-not-displaying-in-an-email-client?lang=en_US#iOS">
                                    <span style={{ color: "#0000ff" }}>
                                      Constant Contact ®
                                    </span>
                                  </a>
                                </strong>
                              </u>
                              .{" "}
                              <span style={{ fontSize: "10px" }}>
                                <em>
                                  (ListingReach.com and its affiliates are not
                                  associated in any way this 3rd party
                                  reference)
                                </em>
                              </span>
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I am a FSBO (for sale by owner). Can I send a blast?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            No. We do not allow For Sale by Owner blasts. If you
                            want to advertise your property with Property Blast,
                            you will need to list your property with a real
                            estate agent or broker. Property Blast is a Business
                            to Business marketing platform for real estate
                            professionals.
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I blast a pocket listing?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A: <span className="ng-binding">Yes</span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How do I find my blast on your Facebook Page?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              As an aspaned courtesy, we post real estate blasts
                              on our Facebook page provided our "fill in the
                              blank" style or "upload your own pdf flyer"
                              templates were utilized.
                            </span>

                            <span>
                              Click{" "}
                              <strong>
                                <u>
                                  <a href="https://www.facebook.com/ListingReach/">
                                    <span style={{ color: "#0000ff" }}>
                                      https://www.facebook.com/ListingReach/
                                    </span>
                                  </a>
                                </u>
                              </strong>{" "}
                              and then click "posts" and then enter your "email
                              subject line" into the "search for posts on this
                              page" field.&nbsp; (see image below)
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            We have a software we would like to market to real
                            estate agents. Do you allow that?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Sorry, no, we do not allow any type of website,
                              app or software sales even if they are designed
                              specifically for real estate agents.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            What is the cut off deadivine to get an order in on
                            the same day?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Our server runs on Eastern Time.&nbsp; Same day
                              orders must be submitted by 5pm Eastern 2pm
                              Pacific.&nbsp; Orders to be deployed on a Saturday
                              must be in by midnight on the Friday before.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I wanted to advertise a service and I was told that
                            my service did not qualify or that I needed to redo
                            my flyer. Why?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              We reserve the right to refuse any advertisement
                              we believe is incompatible with our mission. Full
                              refunds will be issued under the following
                              conditions:
                            </span>

                            <ol>
                              <li>
                                If the content is found unsuitable for
                                broadcast, we will inform you to remove the
                                objectionable content. In case you do not make
                                suitable changes, we will cancel your order and
                                issue a full refund to you.
                              </li>
                              <li>
                                If we find that the content is illegible and too
                                difficult to read, the email blast will be
                                refused and a refund will be issued.
                              </li>
                              <li>
                                If content is deemed to be of a competitive
                                nature to ListingReach.com and its affiliates,
                                the email blast will be refused and a refund
                                will be issued.
                              </li>
                              <li>
                                If the service is not 100% dedicated to the
                                business of facilitating real estate
                                brokerage,&nbsp; the email blast will be refused
                                and a refund will be issued.
                              </li>
                            </ol>

                            <span>&nbsp;</span>

                            <span>
                              ListingReach.com and its affiliates will not
                              accept advertising that, in our sole opinion, is
                              not in good taste. We will not permit the
                              placement of
                            </span>

                            <ul>
                              <li>
                                advertising for illegal or objectionable
                                products or services
                              </li>
                              <li>
                                or advertising that is offensive to any
                                individual or group of individuals based on age,
                                color, national origin, race, religion, sex,
                                sexual orientation, or handicap.
                              </li>
                            </ul>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Do you guarantee results?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Many do quite well.&nbsp; However below is an
                              excerpt from our terms and conditions which you
                              will be required to review during the order
                              process:
                            </span>

                            <span>
                              The site is provided by ListingReach.com on an 'as
                              is' and on an 'as available' basis.&nbsp; To the
                              fullest extent permitted by applicable law,
                              ListingReach.com makes no representations or
                              warranties of any kind, express or implied,
                              regarding the use or the results of this web site
                              in terms of its correctness, accuracy,
                              reliability, or otherwise.&nbsp; ListingReach.com
                              shall have no liability for any interruptions in
                              the use of this Website.&nbsp; ListingReach.com
                              disclaims all warranties with regard to the
                              information provided, including the implied
                              warranties of merchantability and fitness for a
                              particular purpose, and non-infringement.&nbsp;
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I was told that my email aspanress or website was on
                            a blacklist. What does this mean?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              We run every website which his entered into our
                              system through 3 3<sup>rd</sup> party blacklist
                              checkers:
                            </span>

                            <ul>
                              <li>
                                <a href="http://www.spamhaus.org">
                                  www.spamhaus.org
                                </a>
                              </li>
                              <li>
                                <a href="http://www.uribl.com">www.uribl.com</a>
                              </li>
                              <li>
                                <a href="http://www.spamcop.net">
                                  www.spamcop.net
                                </a>
                              </li>
                            </ul>

                            <span>
                              When you receive an alert at our site, we are
                              simply relaying the situation that either your
                              “domain” is listed or the “IP aspanress” of your
                              domain is listed.&nbsp; If it’s the IP aspanress,
                              this typically takes place when you are on a
                              “shared IP aspanress” with other websites. What
                              this means is that YOU are affected if others that
                              share the same IP aspanress as you do something
                              malicious. &nbsp;&nbsp;
                            </span>

                            <span>
                              You will want to report this situation to your
                              website, office or email support staff.&nbsp;
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I advertise a property which is located outside
                            of the United States? For example, "Mexico"?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              No, we do now allow the advertising of properties
                              outside of the United States.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I miss spelled a word in my blast. Will you send it
                            again for free?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Sorry but NO, we will not be able to resend a
                              blast simply because you miss spelled a
                              word.&nbsp; Please make sure you are proofing your
                              work prior to finalizing the order and
                              paying.&nbsp; An email proof is sent to you and
                              you should be reviewing the proof carefully before
                              paying for the blast.
                            </span>

                            <span>
                              Most of our subscribers will not recognize a
                              typographical error and even if they do, this will
                              not be detrimental to the advertisement.&nbsp;
                              Most of our recipients will actually think they
                              received the same email twice and this can cause
                              recipients to unsubscribe so we cannot allow
                              "duplicate" blasts simply because you miss spelled
                              a word.
                            </span>

                            <span>
                              This is a "do it yourself" program so please proof
                              your work prior to paying for it. We do not check
                              your spelling.
                            </span>

                            <span>
                              Our refund and credit policy can be found here:{" "}
                              <a href="https://ListingReach.com/refundpolicy">
                                https://ListingReach.com/refundpolicy
                              </a>
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Can I send out religious holiday greetings?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              While we certainly appreciate your enthusiasm to
                              wish well to all, our database of real estate
                              agents is comprised of so many different faiths
                              that we simply prefer to say "Holiday or Holidays"
                              so that all of the recipients in our database are
                              included in those wishes. We certainly appreciate
                              your understanding in this matter.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I placed an order which has not yet been deployed.
                            Can I EDIT the blast before it goes?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Yes, We have an <strong>EDIT</strong> function and
                              is very easy to do.
                            </span>

                            <ol>
                              <li value="NaN">
                                <div>Sign into your account</div>
                              </li>
                              <li value="NaN">
                                <div>Click My Saved Blasts</div>
                              </li>
                              <li value="NaN">
                                <div>
                                  Click <strong>EDIT</strong> next to your
                                  order.
                                </div>
                              </li>
                            </ol>

                            <div>
                              PLEASE be advised that you must “resubmit” the
                              order back to us via the “submit” button found on
                              the “payment” step.&nbsp; You will not pay again
                              but you need to submit via the payment page.
                            </div>

                            <div>
                              <strong>Click Here</strong>{" "}
                              <strong>
                                to watch our 2 minute “Edit Your Work” tutorial
                              </strong>
                              :&nbsp;
                              <u>
                                <strong>
                                  <span style={{ color: "#0000ff" }}> </span>
                                  <a href="https://ListingReach.com/tutorials">
                                    <span style={{ color: "#0000ff" }}>
                                      https://ListingReach.com/tutorials
                                    </span>
                                  </a>
                                </strong>
                              </u>
                            </div>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I sent a blast out previously and I would like to
                            send it again and maybe make some changes before
                            doing so. Is that possible?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>Yes, you can resend a blast.</span>

                            <div style={{ marginLeft: "40px" }}>
                              1) Sign in to your account
                            </div>

                            <div style={{ marginLeft: "40px" }}>
                              2) Click on MY ACCOUNT in the navigation bar to
                              open your “Control Panel”
                            </div>

                            <div style={{ marginLeft: "40px" }}>
                              3) Click on MY SAVED BLASTS in your control panel
                            </div>

                            <div style={{ marginLeft: "40px" }}>
                              4) Click on SCHEDULE AND PAY AGAIN next to the ID#
                              you want to resend.
                            </div>

                            <span>
                              Once the template opens, click “Enter Your
                              Content” on the left hand side of the page to make
                              creative changes.&nbsp;{" "}
                              <strong>(See Image Below)</strong>
                            </span>

                            <span>
                              Once you have made any necessary changes, continue
                              to proof your work, schedule and then submit
                              payment. &nbsp;
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I sent out a blast and I had entered some incorrect
                            information in it. Will you send it out again for
                            free?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              No, unfortunately as it states in our posted{" "}
                              <strong>
                                <u>
                                  <a href="https://ListingReach.com/refundpolicy">
                                    <span style={{ color: "#0000ff" }}>
                                      refund policy
                                    </span>
                                  </a>
                                </u>
                              </strong>
                              :
                            </span>

                            <div className="">
                              <div className="col-xs-10 col-xs-offset-1">
                                <span>
                                  ListingReach.com does not issue refunds for
                                  the following conditions
                                </span>

                                <ol>
                                  <li>
                                    <span>
                                      ListingReach.com does not issue refunds or
                                      credits for customer errors. Electronic
                                      proofs are provided in advance of
                                      member/user distribution. It is your
                                      responsibility to review your proof for
                                      accuracy prior to distribution.
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                      In the event that ListingReach.com makes
                                      an error while fulfilling an order, it
                                      will resend the order at no charge.
                                      ListingReach.com may also issue credits
                                      for future purchases but no refunds will
                                      be given.
                                    </span>
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            How can I pay for a ListingReach.com?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              We accept credit cards online in our secure
                              interface.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I have an open house today. Is there still time to
                            get the blast out?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Our delivery system is designed to drip out email
                              aspanresses very slowly and naturally for
                              optimized delivery. This process takes several
                              hours to complete. It is advised to plan at least
                              1 day in advance for event advertising. Please
                              keep in mind that we review all orders before they
                              are sent and that our office hours are Mon-Fri
                              9-5pm eastern time. If the calendar does not allow
                              you to select a specific day then you must select
                              the next available day.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I spoke to people who said they never saw my blast.
                            Why?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              Some people take advantage of the unsubscribe link
                              found at the bottom of every blast we send. If you
                              know of agents that did not get the blast, they
                              have previously unsubscribed.&nbsp; Most don't
                              recall ever doing it. If they would like to join
                              us again, we provide a "join our mailing list"
                              button on our home page.
                            </span>

                            <span>
                              Open rates are also covered on this FAQ
                              page.&nbsp; Keeping in mind that a ListingReach
                              email blast is an "advertisement", some agents
                              simply do not take the time to open every email
                              that is an advertisement.&nbsp; If our email is
                              deleted without opening, then of course, they will
                              not know who sent the email and if asked after the
                              fact, the answer will be "NO".
                            </span>

                            <span>
                              We know the number you will be reaching is
                              important, this is why we provide you an estimated
                              number of recipients during the database selection
                              step as well as just before you enter your payment
                              details.
                            </span>

                            <span>
                              Stats for your blast are provided in your account
                              under the "My Saved Blasts" icon.
                            </span>

                            <span>
                              If making sure that your friends and colleagues
                              receive your blast is important, then please speak
                              them prior to placing an order and simply ask them
                              if they receive the PropertyBlatsHomes listing
                              alerts.&nbsp; If they say no, then you know they
                              have unsubscribed.&nbsp; We do not offer refunds
                              or credits if you speak to an agent who has
                              previously unsubscribed and did not receive your
                              blast.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            I want to advertise a lead generation system to
                            realtors. Can I do that?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              No, we do not allow lead generation systems. Lead
                              gen carries a stigma of being scammy which
                              ultimately causes subscribers to opt of our
                              database. So even though it is related to real
                              estate, we simply do not allow this.
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            What is the Gmail "Promotions Tab"?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              The Gmail inbox is broken down into 3
                              categories.&nbsp; Primary, Social and
                              Promotions.&nbsp; Emails that gmail deems to be
                              advertisements will be filtered into the
                              promotions tab as shown below.&nbsp; You can
                              remove the promotions tab by clicking the settings
                              icon on the upper right side of the gmail
                              page.&nbsp; (looks like a gear)
                            </span>
                          </span>
                        </span>
                        <span className="ng-scope" style={{ fontWeight: "700" }}>
                          Q:{" "}
                          <span className="ng-binding">
                            Is the equal housing logo required in the email
                            blast?
                          </span>
                        </span>
                        <span className="ng-scope mb-3">
                          A:{" "}
                          <span className="ng-binding">
                            <span>
                              <span className="ILfuVd NA6bn">
                                <span className="e24Kjd">
                                  According to information found at the National
                                  Association of Realtors website, the{" "}
                                  <b>Fair Housing</b> Act itself does not{" "}
                                  <b>require</b> the use of <b>Equal</b>{" "}
                                  Opportunity <b>logo</b> or slogan, “
                                  <b>Equal Housing</b> Opportunity,” in any ad.
                                  ... Note that the small house picture cannot
                                  be used without the words “
                                  <b>equal housing</b> opportunity” beneath it,
                                  but the words can be used without the small
                                  house picture.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
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

const connectedFaqsPage = connect(mapStateToProps)(FaqsPage);
export { connectedFaqsPage as FaqsPage };
