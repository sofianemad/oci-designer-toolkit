export OKIT_DIR=~/okit
file="$OKIT_DIR/log/okit.log"
mkdir -p $(dirname $file) && touch "$file"

TARGET_DIR="oci-designer-toolkit"
cd ~
git -C "$TARGET_DIR" pull || git clone https://github.com/oracle/oci-designer-toolkit "$TARGET_DIR"

pip install python-magic --user
tenancy_id=$(oci iam compartment list --all --compartment-id-in-subtree true --access-level ACCESSIBLE --include-root --raw-output --query "data[?contains(\"id\",'tenancy')].id | [0]")
python oci-designer-toolkit/visualiser/okit_query.py -p $OCI_CLI_PROFILE -r $OCI_CLI_PROFILE -j ~/okit-$OCI_CLI_PROFILE.json -c $tenancy_id -s