# -*- coding: utf-8 -*-
import urllib2
from sgmllib import SGMLParser
import os

class ListName(SGMLParser):
	def __init__(self):
		SGMLParser.__init__(self)
		self.is_td = 0
		self.name = []
	def start_td(self, attrs):
		self.is_td += 1
	def end_td(self):
		self.is_td -= 1
	def handle_data(self, text):
		if self.is_td == 2:
			self.name.append(text)

cmd='arp -a '+'192.168.1.1'
mac_string=os.popen(cmd,'r').read()
print mac_string
index= mac_string.index('at')
print index
mac_addr=mac_string[index+3:index+20]
print mac_addr
content=urllib2.urlopen('http://mac.51240.com/'+mac_addr+'__mac/').read()
contentHandler=ListName()
contentHandler.feed(content)
result=contentHandler.name[3]
print result
