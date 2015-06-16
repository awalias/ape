import time
from selenium import webdriver
import os
import SocketServer
import subprocess
import SimpleHTTPServer
import threading
import SocketServer
import unittest
from selenium.webdriver.chrome.options import Options

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
    	# Start Javascript Server
		Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
		self.httpd = SocketServer.TCPServer(("", 8000), Handler)
		thread = threading.Thread(target = self.httpd.serve_forever)
		thread.deamon = True
		thread.start()
		time.sleep(3)

		chop = webdriver.ChromeOptions()
		chop.add_argument("--load-extension=" + "../../");
		# Start chromedriver
		if os.uname()[0] == "Darwin":
			self.driver = webdriver.Chrome('../../../chromedriver', chrome_options = chop)

		self.driver.get('http://localhost:8000');

	def test_navigator_class_name(self):
		element = self.driver.find_element_by_id("Navigator")
		html = element.get_attribute('innerHTML')
		self.assertIn("Navigator", html)

	def test_screen_class_name(self):
		element = self.driver.find_element_by_id("Screen")
		html = element.get_attribute('innerHTML')
		self.assertIn("Screen", html)

	@classmethod
	def tearDownClass(self):
    	# self.driver.quit()
		self.httpd.shutdown()

if __name__=="__main__":
	unittest.main(exit=False)
	print "\n\n\n"
	cleanup() # required, driver.quit is buggy


	


	
