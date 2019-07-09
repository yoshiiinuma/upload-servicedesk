
import { expect } from 'chai';

import * as Helper from './helper.js';
import parse from '../src/csv-parser.js';

const line1 = '"DetailNotes","03/03/2019 04:04:04","Original, Created, By","555","123","Original, Modified, By","01/01/2019 02:02:02","Title","234"';

const exp1 = [
  'DetailNotes', '03/03/2019 04:04:04', 'Original, Created, By', '555', '123', 'Original, Modified, By',
  '01/01/2019 02:02:02', 'Title', '234'];

const line2 = "\"Pescador, John K\",,,,\"1\",\"\",\"132.160.218.132\",\"\",\"3/18/2016 7:48:17 PM\",\"Closed\",,,\"DePonte, Derek A\",\"502\",,,\"1\",,,\"Security\",\"<div class=\"\"ExternalClass45A170CA15A841B0B6F028A6354221EB\"\"><div>Active</div><div><div>SSL 64-bit Block Size Cipher Suites Supported (SWEET32)<span class=\"\"Apple-tab-span\"\" style=\"\"white-space&#58;pre;\"\">  </span>&quot;The remote host supports the use of a block cipher with 64-bit blocks in one or more cipher suites. It is, therefore, affected by a vulnerability, known as SWEET32, due to the use of weak 64-bit block ciphers. A man-in-the-middle attacker who has sufficient resources can exploit this vulnerability, via a 'birthday' attack, to detect a collision that leaks the XOR between the fixed secret and a known plaintext, allowing the disclosure of the secret text, such as secure HTTPS cookies, and possibly resulting in the hijacking of an authenticated session.</div><div><br>&#160;</div><div>Proof-of-concepts have shown that attackers can recover authentication cookies from an HTTPS session in as little as 30 hours.&quot;<span class=\"\"Apple-tab-span\"\" style=\"\"white-space&#58;pre;\"\">     </span>Reconfigure the affected application, if possible, to avoid use of all 64-bit block ciphers.?<br></div><br></div><div>Previous<br></div><div>SSL Version 2 and 3 Protocol Detection<br>exec732.hawaii.gov</div></div>\",,\"3/21/2017 11:31:46 PM\",\"Vulnerability\",\"Higa, Karen M\",,,\"SSL 64-bit Block Size Cipher Suites Supported (SWEET32) - Ehiku (Domino) - 132.160.218.132\",\"E-mail\"";

const exp2 = [
  "Pescador, John K", undefined, undefined, undefined, "1", "", "132.160.218.132", "", "3/18/2016 7:48:17 PM",
  "Closed", undefined, undefined, "DePonte, Derek A", "502", undefined, undefined, "1", undefined, undefined, "Security",
  "<div class='ExternalClass45A170CA15A841B0B6F028A6354221EB'><div>Active</div><div><div>SSL 64-bit Block Size Cipher Suites Supported (SWEET32)<span class='Apple-tab-span' style='white-space&#58;pre;'>  </span>&quot;The remote host supports the use of a block cipher with 64-bit blocks in one or more cipher suites. It is, therefore, affected by a vulnerability, known as SWEET32, due to the use of weak 64-bit block ciphers. A man-in-the-middle attacker who has sufficient resources can exploit this vulnerability, via a 'birthday' attack, to detect a collision that leaks the XOR between the fixed secret and a known plaintext, allowing the disclosure of the secret text, such as secure HTTPS cookies, and possibly resulting in the hijacking of an authenticated session.</div><div><br>&#160;</div><div>Proof-of-concepts have shown that attackers can recover authentication cookies from an HTTPS session in as little as 30 hours.&quot;<span class='Apple-tab-span' style='white-space&#58;pre;'>     </span>Reconfigure the affected application, if possible, to avoid use of all 64-bit block ciphers.?<br></div><br></div><div>Previous<br></div><div>SSL Version 2 and 3 Protocol Detection<br>exec732.hawaii.gov</div></div>",
  undefined, "3/21/2017 11:31:46 PM", "Vulnerability", "Higa, Karen M", undefined, undefined,
  "SSL 64-bit Block Size Cipher Suites Supported (SWEET32) - Ehiku (Domino) - 132.160.218.132", "E-mail"];

const line3 = '"<div class=""ExternalClass1B7FE13DF628430296C29611F2EC0711"">REASSIGNED</div>","06/06/2016 18:18:43","Lajola, Darryl E","","7","Lajola, Darryl E","06/06/2016 18:18:43","Lajola, Darryl E","1466"';

const exp3 = [
  "<div class='ExternalClass1B7FE13DF628430296C29611F2EC0711'>REASSIGNED</div>", '06/06/2016 18:18:43',
  'Lajola, Darryl E', '', '7', 'Lajola, Darryl E', '06/06/2016 18:18:43', 'Lajola, Darryl E', '1466'];

const line4 = "\"<div class=\"\"ExternalClass56E8398270E9499A87824A5A4CBAED5D\"\">Hi Karl,The shared mailboxes you requested have been created.     Display Name&#58;               DLIR.DCD.Workers' Compensation Rec &amp; Claims Docushare       Email Address &#58;              dlir.dcd.ds.xx@yyy.zzz       Mailbox Delegation&#58; All 13 users listed in your spreadsheet (Full Access/Send As permission)        Forwarding&#58;         Notes group forwarder created; all new incoming mail will be delivered to the Exchange mailbox. Display Name&#58;               DLIR.DCD.Workers' Compensation Clerical Services Docushare      Email Address&#58;              dlir.dcd.ds.csu@hawaii.gov      Mailbox Delegation&#58; All 7 users listed in your spreadsheet (Full Access/Send As permission) Forwarding&#58;         Notes group forwarder created; all new incoming mail will be delivered to the Exchange mailbox.Celeste</div>\",\"06/07/2016 02:51:08\",\"Ching, Celeste L\",\"\",\"70\",\"Ching, Celeste L\",\"06/07/2016 02:51:08\",\"Ching, Celeste L\",\"1489\"";

const exp4 = ["<div class='ExternalClass56E8398270E9499A87824A5A4CBAED5D'>Hi Karl,The shared mailboxes you requested have been created.     Display Name&#58;               DLIR.DCD.Workers' Compensation Rec &amp; Claims Docushare       Email Address &#58;              dlir.dcd.ds.xx@yyy.zzz       Mailbox Delegation&#58; All 13 users listed in your spreadsheet (Full Access/Send As permission)        Forwarding&#58;         Notes group forwarder created; all new incoming mail will be delivered to the Exchange mailbox. Display Name&#58;               DLIR.DCD.Workers' Compensation Clerical Services Docushare      Email Address&#58;              dlir.dcd.ds.csu@hawaii.gov      Mailbox Delegation&#58; All 7 users listed in your spreadsheet (Full Access/Send As permission) Forwarding&#58;         Notes group forwarder created; all new incoming mail will be delivered to the Exchange mailbox.Celeste</div>",
  "06/07/2016 02:51:08", "Ching, Celeste L", "", "70", "Ching, Celeste L", "06/07/2016 02:51:08",
  "Ching, Celeste L", "1489"];

describe('CsvParser#parse', () => {
  it('splits a simple Service Desk Ticket CSV line into array', () => {
    expect(parse(line1)).to.be.eql(exp1);
  });

  it('splits a complex Service Desk Ticket CSV line into array', () => {
    expect(parse(line2)).to.be.eql(exp2);
  });

  it('splits a simple Service Desk Ticket Detail CSV line into array', () => {
    expect(parse(line3)).to.be.eql(exp3);
  });

  it('splits a complex Service Desk Ticket Detail CSV line into array', () => {
    expect(parse(line4)).to.be.eql(exp4);
  });

});

