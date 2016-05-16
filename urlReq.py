# -*- coding: utf-8 -*-
import urllib2
from sgmllib import SGMLParser

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

content=urllib2.urlopen('http://mac.51240.com/00-1C-16-34-2E-96__mac/').read()
# print content
contentHandler=ListName()
contentHandler.feed(content)
result=contentHandler.name[3]
print result
