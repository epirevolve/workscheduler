# -*- coding: utf-8 -*-

from selenium import webdriver


def non_working_test():
    browser = webdriver.Firefox()
    browser.get('http://127.0.0.1:5000/')
    browser.close()
    browser.quit()
