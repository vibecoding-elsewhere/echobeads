import { useNavigate } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function PrivacyPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <span className={styles.backArrow}>←</span> back
      </button>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Elsewhere</p>
        <h1 className={styles.title}>Privacy Notice</h1>
        <p className={styles.updated}>Last updated May 28, 2026</p>
      </div>

      <div className={styles.body}>

        {/* ── INTRO ── */}
        <div className={styles.section}>
          <p className={styles.p}>
            This Privacy Notice for Elsewhere ("<strong>we</strong>," "<strong>us</strong>," or
            "<strong>our</strong>") describes how and why we might access, collect, store, use, and/or share
            ("process") your personal information when you use our services ("<strong>Services</strong>").
          </p>
          <p className={styles.p}>
            Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights
            and choices. We are responsible for making decisions about how your personal information is
            processed. If you do not agree with our policies and practices, please do not use our Services.
          </p>
        </div>

        {/* ── SUMMARY ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary of Key Points</h2>
          <p className={styles.p}>
            <strong>What personal information do we process?</strong> When you visit, use, or navigate our
            Services, we may process personal information depending on how you interact with us and the
            Services, the choices you make, and the products and features you use.
          </p>
          <p className={styles.p}>
            <strong>Do we process any sensitive personal information?</strong> We do not process sensitive
            personal information.
          </p>
          <p className={styles.p}>
            <strong>Do we collect any information from third parties?</strong> We may collect information
            from public databases, marketing partners, social media platforms, and other outside sources.
          </p>
          <p className={styles.p}>
            <strong>How do we process your information?</strong> We process your information to provide,
            improve, and administer our Services, communicate with you, for security and fraud prevention,
            and to comply with law. We may also process your information for other purposes with your
            consent. We process your information only when we have a valid legal reason to do so.
          </p>
          <p className={styles.p}>
            <strong>In what situations and with which parties do we share personal information?</strong> We
            may share information in specific situations and with specific third parties.
          </p>
          <p className={styles.p}>
            <strong>What are your rights?</strong> Depending on where you are located geographically, the
            applicable privacy law may mean you have certain rights regarding your personal information.
          </p>
          <p className={styles.p}>
            <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is
            by contacting us at <strong>hello@elsewhere.app</strong>. We will consider and act upon any
            request in accordance with applicable data protection laws.
          </p>
        </div>

        {/* ── 1. WHAT WE COLLECT ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. What Information Do We Collect?</h2>
          <p className={styles.p}>
            <strong>Personal information you disclose to us.</strong> We collect personal information that
            you voluntarily provide to us when you register on the Services, express an interest in
            obtaining information about us or our products and Services, when you participate in activities
            on the Services, or otherwise when you contact us.
          </p>
          <p className={styles.p}>
            The personal information we collect may include names, email addresses, passwords, and any
            content you choose to submit (such as reflections and mood entries). We do not process
            sensitive information.
          </p>
          <p className={styles.p}>
            All personal information that you provide to us must be true, complete, and accurate, and you
            must notify us of any changes to such personal information.
          </p>
          <p className={styles.p}>
            <strong>Information automatically collected.</strong> Some information — such as your Internet
            Protocol (IP) address and/or browser and device characteristics — is collected automatically
            when you visit our Services. This information does not reveal your specific identity (like your
            name or contact information) but may include device and usage information, such as your IP
            address, browser and device characteristics, operating system, language preferences, referring
            URLs, device name, country, location, information about how and when you use our Services, and
            other technical information. This information is primarily needed to maintain the security and
            operation of our Services, and for our internal analytics and reporting purposes.
          </p>
          <p className={styles.p}>
            Like many businesses, we also collect information through cookies and similar technologies.
          </p>
        </div>

        {/* ── 2. HOW WE PROCESS ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How Do We Process Your Information?</h2>
          <p className={styles.p}>
            We process your personal information for a variety of reasons, depending on how you interact
            with our Services, including:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              To facilitate account creation and authentication and manage user accounts.
            </li>
            <li className={styles.listItem}>
              To save and display your personal reflections privately in your notes archive.
            </li>
            <li className={styles.listItem}>
              To show shared reflections anonymously in the community feed, if you opt in.
            </li>
            <li className={styles.listItem}>
              To send you marketing and promotional communications, if you have opted in at signup.
            </li>
            <li className={styles.listItem}>
              To protect our Services, including fraud monitoring and prevention.
            </li>
            <li className={styles.listItem}>
              To comply with our legal obligations, respond to legal requests, and prevent harm.
            </li>
          </ul>
        </div>

        {/* ── 3. SHARING ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. When and With Whom Do We Share Your Personal Information?</h2>
          <p className={styles.p}>
            We may need to share your personal information in the following situations:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Business Transfers.</strong> We may share or transfer your information in connection
              with, or during negotiations of, any merger, sale of company assets, financing, or acquisition
              of all or a portion of our business to another company.
            </li>
            <li className={styles.listItem}>
              <strong>Affiliates.</strong> We may share your information with our affiliates, in which case
              we will require those affiliates to honor this Privacy Notice.
            </li>
            <li className={styles.listItem}>
              <strong>Business Partners.</strong> We may share your information with our business partners
              to offer you certain products, services, or promotions.
            </li>
          </ul>
          <p className={styles.p}>
            We will never sell your personal data to third parties.
          </p>
        </div>

        {/* ── 4. COOKIES ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Do We Use Cookies and Other Tracking Technologies?</h2>
          <p className={styles.p}>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather
            information when you interact with our Services. Some online tracking technologies help us
            maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and
            assist with basic site functions.
          </p>
          <p className={styles.p}>
            We also permit third parties and service providers to use online tracking technologies on our
            Services for analytics purposes. Specific information about how we use such technologies and
            how you can refuse certain cookies is set out in our Cookie Notice.
          </p>
        </div>

        {/* ── 5. SOCIAL LOGINS ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. How Do We Handle Your Social Logins?</h2>
          <p className={styles.p}>
            Our Services offer you the ability to register and log in using your third-party social media
            account details. Where you choose to do this, we will receive certain profile information about
            you from your social media provider. The profile information we receive may vary depending on
            the social media provider concerned, but will often include your name, email address, and
            profile picture.
          </p>
          <p className={styles.p}>
            We will use the information we receive only for the purposes that are described in this Privacy
            Notice. Please note that we do not control, and are not responsible for, other uses of your
            personal information by your third-party social media provider. We recommend that you review
            their privacy notice to understand how they collect, use, and share your personal information.
          </p>
        </div>

        {/* ── 6. INTERNATIONAL TRANSFERS ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Is Your Information Transferred Internationally?</h2>
          <p className={styles.p}>
            Our Services are hosted in the United States via Supabase. Regardless of your location, please
            be aware that your information may be transferred to, stored by, and processed by us in the
            United States and in the facilities of the third parties with whom we may share your personal
            information.
          </p>
          <p className={styles.p}>
            If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland,
            then these countries may not necessarily have data protection laws or other similar laws as
            comprehensive as those in your country. However, we will take all necessary measures to protect
            your personal information in accordance with this Privacy Notice and applicable law.
          </p>
        </div>

        {/* ── 7. RETENTION ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. How Long Do We Keep Your Information?</h2>
          <p className={styles.p}>
            We will only keep your personal information for as long as it is necessary for the purposes set
            out in this Privacy Notice, unless a longer retention period is required or permitted by law
            (such as tax, accounting, or other legal requirements).
          </p>
          <p className={styles.p}>
            When we have no ongoing legitimate business need to process your personal information, we will
            either delete or anonymize such information, or, if this is not possible, then we will securely
            store your personal information and isolate it from any further processing until deletion is
            possible.
          </p>
        </div>

        {/* ── 8. MINORS ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Do We Collect Information from Minors?</h2>
          <p className={styles.p}>
            We do not knowingly collect, solicit data from, or market to children under 18 years of age,
            nor do we knowingly sell such personal information. By using the Services, you represent that
            you are at least 18 or that you are the parent or guardian of such a minor and consent to such
            minor dependent's use of the Services.
          </p>
          <p className={styles.p}>
            If we learn that personal information from users less than 18 years of age has been collected,
            we will deactivate the account and take reasonable measures to promptly delete such data from
            our records. If you become aware of any data we may have collected from children under age 18,
            please contact us at <strong>hello@elsewhere.app</strong>.
          </p>
        </div>

        {/* ── 9. PRIVACY RIGHTS ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. What Are Your Privacy Rights?</h2>
          <p className={styles.p}>
            You may review, change, or terminate your account at any time, depending on your country,
            province, or state of residence.
          </p>
          <p className={styles.p}>
            <strong>Withdrawing your consent.</strong> If we are relying on your consent to process your
            personal information, you have the right to withdraw your consent at any time by contacting us
            at <strong>hello@elsewhere.app</strong>. Please note that this will not affect the lawfulness
            of the processing before its withdrawal.
          </p>
          <p className={styles.p}>
            <strong>Account Information.</strong> If you would at any time like to review or change the
            information in your account or terminate your account, you can do so from your Profile page
            within the app. Upon your request to terminate your account, we will deactivate or delete your
            account and information from our active databases. However, we may retain some information in
            our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our
            legal terms and/or comply with applicable legal requirements.
          </p>
        </div>

        {/* ── 10. DNT ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Controls for Do-Not-Track Features</h2>
          <p className={styles.p}>
            Most web browsers and some mobile operating systems and mobile applications include a
            Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not
            to have data about your online browsing activities monitored and collected. At this stage, no
            uniform technology standard for recognizing and implementing DNT signals has been finalized.
            As such, we do not currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If a standard for online
            tracking is adopted that we must follow in the future, we will inform you about that practice
            in a revised version of this Privacy Notice.
          </p>
        </div>

        {/* ── 11. UPDATES ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Do We Make Updates to This Notice?</h2>
          <p className={styles.p}>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. We may update
            this Privacy Notice from time to time. The updated version will be indicated by an updated date
            at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may
            notify you either by prominently posting a notice of such changes or by directly sending you a
            notification. We encourage you to review this Privacy Notice frequently to be informed of how
            we are protecting your information.
          </p>
        </div>

        {/* ── 12. CONTACT ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>12. How Can You Contact Us About This Notice?</h2>
          <p className={styles.p}>
            If you have questions or comments about this notice, you may contact us at:
          </p>
          <p className={styles.p}>
            <strong>Elsewhere</strong><br />
            <strong>hello@elsewhere.app</strong>
          </p>
        </div>

        {/* ── 13. DATA REQUESTS ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>13. How Can You Review, Update, or Delete the Data We Collect from You?</h2>
          <p className={styles.p}>
            Based on the applicable laws of your country, you may have the right to request access to the
            personal information we collect from you, details about how we have processed it, correct
            inaccuracies, or delete your personal information. You may also have the right to withdraw your
            consent to our processing of your personal information. These rights may be limited in some
            circumstances by applicable law.
          </p>
          <p className={styles.p}>
            To request to review, update, or delete your personal information, please contact us at{' '}
            <strong>hello@elsewhere.app</strong>. You may also delete your account directly from your
            Profile page within the app.
          </p>
        </div>

      </div>

      <div className={styles.legalFooter}>
        <p>made with care · elsewhere</p>
      </div>
    </div>
  )
}
