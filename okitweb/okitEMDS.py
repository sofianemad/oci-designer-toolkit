# Copyright (c) 2020, Oracle and/or its affiliates.
# Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

"""Provide Module Description
"""

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
__author__ = ["Kyle Voris"]
__version__ = "1.0.0"
__module__ = "okitEMDS"
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

import json
import os
import shutil
import tempfile
import time
import urllib
from flask import Blueprint
from flask import request
from flask import jsonify

import json
from common.okitCommon import logJson
from common.okitCommon import readJsonFile
from common.okitCommon import standardiseIds
from common.okitCommon import writeJsonFile
from common.okitLogging import getLogger

# Configure logging
logger = getLogger()

bp = Blueprint('emds', __name__, url_prefix='/okit/emds', static_folder='static/okit')

debug_mode = bool(str(os.getenv('DEBUG_MODE', 'False')).title())


#
# Define Endpoints
#

@bp.route('/applications', methods=(['GET', 'POST']))
def emdsApplications():
    if request.method == 'GET':
        return
