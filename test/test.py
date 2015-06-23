import time
import os
import SocketServer
import subprocess
import SimpleHTTPServer
import threading
import SocketServer
import unittest
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import re

def getHtmlTableData(tblbody):
	trs=re.findall(r'(?<=<tr>).*?(?=</tr>)', tblbody)
	content=[re.findall(r'(?<=<td>).*?(?=</td>)', tr) for tr in trs]
	return content

def cleanup():
	grepCmd = "ps -aef | grep -E 'chromedriver|Chrome'"
	grepResults = subprocess.check_output([grepCmd], shell=True).split()

	for i in range(1,len(grepResults)):
		pid = grepResults[i]
		killPidCmd = "kill -9 " + pid
		subprocess.call([killPidCmd], shell=True)

class JavascriptTests(unittest.TestCase):

	@classmethod
	def setUpClass(self):
		chop = webdriver.ChromeOptions()
		chop.add_argument("--load-extension=" + "../");
		# Start chromedriver
		if os.uname()[0] == "Darwin":
			self.driver = webdriver.Chrome('../../chromedriver', chrome_options = chop)

		self.driver.get('https://panopticlick.eff.org/index.php?action=log&js=yes');
		time.sleep(7)
		element = self.driver.find_element_by_id("results")
		html = element.get_attribute('innerHTML')
		self.htmlTableData = getHtmlTableData(html)

	def test_navigator_class_name(self):
		value = self.driver.execute_script("return navigator.constructor.toString()")
		self.assertIn("Navigator", value)

	def test_screen_class_name(self):
		value = self.driver.execute_script("return screen.constructor.toString()")
		self.assertIn("Screen", value)

	def test_userAgent(self):
		value = self.driver.execute_script("return navigator.userAgent")
		self.assertEqual("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36", value)

	def test_http_userAgent(self):
		value = self.htmlTableData[1][3]
		self.assertIn("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36", value)

	def test_http_accept_headers(self):
		value = self.htmlTableData[2][3]
		self.assertIn("text/html, */*  gzip, deflate en-US,en;q=0.5", value)

	def test_appVersion(self):
		value = self.driver.execute_script("return navigator.appVersion")
		self.assertEqual("5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36", value)

	def test_platform(self):
		value = self.driver.execute_script("return navigator.platform")
		self.assertEqual("Win32", value)

	def test_Date_Class_Name(self):
		value = self.driver.execute_script("return Date.name")
		self.assertEqual("Date", value)

	def test_Timezone(self):
		value = self.driver.execute_script("d = new Date(); return d.getTimezoneOffset()")
		self.assertEqual(0, value)

	# def test_DateTime_toString(self):
	# 	element = self.driver.find_element_by_id("datetimestring")
	# 	html = element.get_attribute('innerHTML')
	# 	self.assertIn("Navigator", html)

	# def test_DateTime_Static_Method(self):
	# 	element = self.driver.find_element_by_id("datetimestatic")
	# 	html = element.get_attribute('innerHTML')
	# 	self.assertIn("Navigator", html)

	# def test_toLocaleString(self):
	# 	element = self.driver.find_element_by_id("toLocaleString")
	# 	html = element.get_attribute('innerHTML')
	# 	self.assertIn("Navigator", html)

	def test_Height(self):
		value = self.driver.execute_script("return screen.height")
		self.assertEqual(768, value)

	def test_Width(self):
		value = self.driver.execute_script("return screen.width")
		self.assertEqual(1366, value)

	def test_Colour_Depth(self):
		value = self.driver.execute_script("return screen.colorDepth")
		self.assertEqual(24, value)

	def test_Pixel_Depth(self):
		value = self.driver.execute_script("return screen.pixelDepth")
		self.assertEqual(24, value)

	def test_Avail_Height(self):
		value = self.driver.execute_script("return screen.availHeight")
		self.assertGreater(value, 0)

	def test_Avail_Width(self):
		value = self.driver.execute_script("return screen.availWidth")
		self.assertGreater(value, 0)

	def test_Avail_Left(self):
		value = self.driver.execute_script("return screen.availLeft")
		self.assertEqual(0, value)

	def test_Avail_Top(self):
		value = self.driver.execute_script("return screen.availTop")
		self.assertEqual(0, value)

	@classmethod
	def tearDownClass(self):
		#self.driver.quit()
		pass

if __name__=="__main__":
	unittest.main(exit=False)
	print "\n\n\n"
	cleanup() # required, driver.quit is buggy


	


	
